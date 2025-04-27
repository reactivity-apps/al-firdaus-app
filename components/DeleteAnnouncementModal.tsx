import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type AnnouncementModalProps = {
  visible: boolean;
  announcement: {
    id: string;
    title: string;
    message: string;
  } | null;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
};

export default function EditAnnouncementModal({
  visible,
  announcement,
  onClose,
  onDelete
}: AnnouncementModalProps) {
  const [deleteText, setDeleteText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (announcement) {
      setDeleteText('');
    }
  }, [announcement]);


  const handleDelete = async () => {
    if (deleteText !== announcement?.title.toLowerCase()) {
      Alert.alert('Error', 'Please type the announcement title in lowercase to confirm deletion');
      return;
    }

    if (announcement?.id) {
      setIsDeleting(true);
      try {
        await onDelete(announcement.id);
        onClose();
      } catch (error) {
        Alert.alert('Error', 'Failed to delete announcement');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Get the correct placeholder text for delete field
  const deletePlaceholder = announcement?.title ? `Type "${announcement.title.toLowerCase()}" to confirm` : '';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              {/* Header with close button */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Delete Announcement</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Scrollable Content */}
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Delete section */}
                <View style={styles.deleteSection}>
                  <Text style={styles.deleteTitle}>Delete Announcement</Text>
                  <Text style={styles.deleteInstructions}>
                    To delete, type <Text style={{ fontWeight: "bold" }}>"{announcement?.title.toLowerCase()}"</Text> to confirm:
                  </Text>
                  <TextInput
                    style={[styles.input, styles.deleteInput]}
                    value={deleteText}
                    onChangeText={setDeleteText}
                    placeholder={deletePlaceholder}
                    placeholderTextColor="#BB6060"
                  />
                  <TouchableOpacity
                    style={[
                      styles.deleteButton,
                      (deleteText !== announcement?.title?.toLowerCase()) && styles.deleteButtonDisabled
                    ]}
                    onPress={handleDelete}
                    disabled={isDeleting || deleteText !== announcement?.title?.toLowerCase()}
                  >
                    <Text style={styles.deleteButtonText}>
                      {isDeleting ? <ActivityIndicator color="#FFF" /> : 'Delete Announcement'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxHeight: '80%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CDCBCB',
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CDCBCB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    padding: 5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  modalContent: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CDCBCB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  deleteSection: {
    padding: 15,
  },
  deleteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 10,
  },
  deleteInstructions: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  deleteInput: {
    borderColor: '#FF3B30',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteButtonDisabled: {
    backgroundColor: '#FFCCCC',
  },
  deleteButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
});