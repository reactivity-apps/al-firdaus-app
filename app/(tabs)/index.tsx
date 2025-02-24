import { View, Text, StyleSheet } from "react-native";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Announcements</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      color: "#000",
    }
});
