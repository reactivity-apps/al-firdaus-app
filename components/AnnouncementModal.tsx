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
  ScrollView
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
  onSave: (id: string, title: string, message: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function AnnouncementModal({
  visible,
  announcement,
  onClose,
  onSave,
  onDelete
}: AnnouncementModalProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [deleteText, setDeleteText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (announcement) {
      setTitle(announcement.title);
      setMessage(announcement.message);
      setDeleteText('');
    }
  }, [announcement]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Title cannot be empty');
      return;
    }

    if (!message.trim()) {
      Alert.alert('Error', 'Message cannot be empty');
      return;
    }

    if (announcement?.id) {
      setIsSaving(true);
      try {
        await onSave(announcement.id, title, message);
        onClose();
      } catch (error) {
        Alert.alert('Error', 'Failed to save announcement');
      } finally {
        setIsSaving(false);
      }
    }
  };

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
                <Text style={styles.modalTitle}>Edit Announcement</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              {/* Scrollable Content */}
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.inputLabel}>Title</Text>
                  <TextInput
                    style={styles.input}
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Announcement title"
                    placeholderTextColor="#888888"
                  />

                  <Text style={styles.inputLabel}>Message</Text>
                  <TextInput
                    style={[styles.input, styles.messageInput]}
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Announcement message"
                    placeholderTextColor="#888888"
                    multiline={true}
                    numberOfLines={4}
                  />

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSave}
                    disabled={isSaving}
                  >
                    <Text style={styles.saveButtonText}>
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Divider */}
                <View style={styles.divider} />

                {/* Delete section */}
                <View style={styles.deleteSection}>
                  <Text style={styles.deleteTitle}>Delete Announcement</Text>
                  <Text style={styles.deleteInstructions}>
                    To delete, type the announcement title in lowercase:
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
                      {isDeleting ? 'Deleting...' : 'Delete Announcement'}
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
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#444',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CDCBCB',
    borderRadius: 6,
    padding: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  messageInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 5,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#CDCBCB',
    marginVertical: 5,
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