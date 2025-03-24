import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons
import MenuItem from "./MenuItem"; 

type DropdownProps = {
  items: {
    title: string;
    content: {
      label: string;
      link?: string;
      showIcon?: boolean;
    }[];
  }[];
};

const Dropdown = ({ items }: DropdownProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  // Create an array of rotation values, one for each dropdown item
  const [rotations] = useState(() => 
    items.map(() => new Animated.Value(0))
  );

  const toggleExpand = (index: number) => {
    setExpandedIndex((prevIndex) => {
      const newIndex = prevIndex === index ? null : index;

      // Animate the current chevron icon rotation
      Animated.timing(rotations[index], {
        toValue: newIndex === index ? 1 : 0, // 1 for rotated, 0 for normal
        duration: 300,
        useNativeDriver: true,
      }).start();

      // If we're opening a new dropdown and a different one was open before,
      // animate the previously open dropdown's icon back to 0
      if (prevIndex !== null && prevIndex !== index && newIndex !== null) {
        Animated.timing(rotations[prevIndex], {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      }

      return newIndex;
    });
  };

  return (
    <View style={styles.dropdownSection}>
      {items.map((item, index) => {
        // Create interpolated rotation for each dropdown item
        const rotateChevron = rotations[index].interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"], // Rotation values for 0 and 180 degrees
        });

        const isLast = index === items.length - 1;
        const isExpanded = expandedIndex === index;

        return (
          <View key={index}>
            <TouchableOpacity
              style={[
                styles.sectionHeader,
                !isLast && !isExpanded && styles.borderBottom,
                index === 0 && styles.firstItem,
                isLast && !isExpanded && styles.lastItem
              ]}
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.sectionTitle}>{item.title}</Text>
              <View style={styles.chevronContainer}>
                <Animated.View
                  style={{
                    transform: [{ rotate: rotateChevron }]
                  }}
                >
                  <Ionicons name="chevron-down-outline" size={18} style={styles.icon} />
                </Animated.View>
              </View>
            </TouchableOpacity>
            {isExpanded && (
              <View style={[
                styles.contentContainer,
                !isLast && styles.contentBorderBottom,
                isLast && styles.lastItemContent
              ]}>
                {item.content.map((menuItem, itemIndex) => (
                  <MenuItem
                    key={itemIndex}
                    label={menuItem.label}
                    link={menuItem.link}
                    showIcon={menuItem.showIcon}
                    isLast={itemIndex === item.content.length - 1}
                  />
                ))}
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownSection: {
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#CDCBCB",
    overflow: "hidden", // This ensures content doesn't spill outside rounded corners
  },
  sectionHeader: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#CDCBCB",
  },
  firstItem: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  lastItem: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  contentContainer: {
    backgroundColor: "#f2f2f2",
  },
  contentBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#CDCBCB",
  },
  lastItemContent: {
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  sectionTitle: {
    fontSize: 16,
    color: "black",
  },
  chevronContainer: {
    paddingLeft: 10, // Space for the chevron icon
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 16,
    color: "#888",
  },
});

export default Dropdown;