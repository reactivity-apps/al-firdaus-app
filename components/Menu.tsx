import React from "react";
import { Text, StyleSheet, View } from "react-native";
import MenuItem from "./MenuItem"; // Import MenuItem component

type MenuProps = {
  title: string;
  content: ItemProps[];
};

type ItemProps = {
  label: string;
  link?: string; // Optional link prop
  showIcon?: boolean; // Optional boolean to toggle icon
};

const Menu = ({ title, content }: MenuProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.rowContainer}>
        {content.map((item, index) => (
          <MenuItem
            key={index}
            label={item.label}
            link={item.link}
            showIcon={item.showIcon}
            isLast={index === content.length - 1} // Mark last item
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    color: "gray",
    marginBottom: 10,
  },
  rowContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
});

export default Menu;
