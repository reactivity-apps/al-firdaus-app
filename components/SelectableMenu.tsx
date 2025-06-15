/**
* Example usage:
* <SelectableMenu
      title="Title here"
      content={[
          "Example 1",
          "Example 2",
          "Example 3",
      ]}
      selectedValue={"Example 2" || ""}
      onSelect={(value) => functionToPreformOnSelect(value)}
  />
* 
*/

import React from "react";
import { 
    TouchableOpacity, 
    View, 
    Text,
    StyleSheet 
} from "react-native";

type SelectableMenuProps = {
    title: string;
    content: string[];
    onSelect: (value: string) => void;
    selectedValue?: string; 
  };

const SelectableMenu = ({ title, content, onSelect, selectedValue }: SelectableMenuProps) => {
  return (
    <View style={styles.menuSection}>
      <Text style={styles.menuSectionTitle}>{title}</Text>
      <View style={styles.menuRowContainer}>
        {content.map((label, index) => {
          const isLast = index === content.length - 1;
          const isSelected = label === selectedValue;

          return (
            <TouchableOpacity
              key={label}
              onPress={() => onSelect(label)}
              style={[
                styles.menuRow,
                isLast && styles.menuLastRow,
                isSelected && styles.menuSelectedRow,
              ]}
            >
              <Text style={styles.menuLabel}>{label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default SelectableMenu;

const styles = StyleSheet.create({
    menuSection: {
        marginBottom: 20,
    },
    menuSectionTitle: {
        fontSize: 15,
        color: "gray",
        marginBottom: 10,
    },
    menuRowContainer: {
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#CDCBCB",
        overflow: "hidden",
    },
    menuRow: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#CDCBCB",
    },
    menuLabel: {
        fontSize: 16,
        color: "#333",
    },
    menuLastRow: {
        borderBottomWidth: 0,
    },
    menuSelectedRow: {
        backgroundColor: "#f0f0f0",
    },
});
