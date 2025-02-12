import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Link } from "expo-router";

type MenuProps = {
  title: string;
  content: ItemProps[];
};

type ItemProps = {
  label: string;
  link?: string; // Optional link prop
  showIcon?: boolean; // Optional boolean to toggle icon
};

const Item = ({ label, link, showIcon, isLast }: ItemProps & { isLast?: boolean }) => {
  const itemStyle = isLast ? { ...styles.row, ...styles.lastRow } : styles.row;

  const content = (
    <TouchableOpacity style={itemStyle}>
      <Text style={styles.label}>{label}</Text>
      {showIcon && <Ionicons name="chevron-forward-outline" style={styles.icon} />}
    </TouchableOpacity>
  );

  return link ? <Link href={link} asChild>{content}</Link> : content;
};


const Menu = ({ title, content }: MenuProps) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.rowContainer}>
        {content.map((item, index) => (
          <Item 
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

export default Menu;

const styles = StyleSheet.create({
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  rowContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  row: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CDCBCB",
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  icon: {
    fontSize: 16,
    color: "#888",
  },
  lastRow: {
    borderBottomWidth: 0, // Removes border from the last row
  },
});
