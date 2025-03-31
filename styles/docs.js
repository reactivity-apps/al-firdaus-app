import { StyleSheet } from "react-native";

export const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingBottom: 40,
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
      color: "#333",
    },
    subHeader: {
      fontSize: 18,
      marginBottom: 20,
      color: "#666",
    },
    description: {
      fontSize: 16,
      color: "#666",
      lineHeight: 24,
    },
    image: {
      width: '100%',
      height: 350,
      marginBottom: 20,
      resizeMode: 'cover',
      borderRadius: 12,
    },
    sectionContainer: {
      marginTop: 20,
    },
    sectionHeader: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: "#444",
    },
    bulletList: {
      marginTop: 10,
      paddingLeft: 10,
    },
    bulletItem: {
      fontSize: 16,
      color: "#666",
      marginVertical: 4,
      lineHeight: 22,
    },
    hotelContainer: {
      marginTop: 20,
      backgroundColor: '#f5f5f5',
      borderRadius: 10,
      padding: 15,
    },    
});

