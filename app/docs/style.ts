import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      paddingBottom: 40,
      backgroundColor: "#fff",
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subHeader: {
      fontSize: 16,
      marginBottom: 20,
      color: "#666",
    },
    description: {
      fontSize: 16,
      color: 'gray',
      lineHeight: 22,
    },
    
    image: {
      width: '100%',
      height: 400, // Bigger image for a more immersive experience
      marginBottom: 15,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    hotelContainer: {
      marginTop: 20,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      padding: 15,
    },
    sectionHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    bulletList: {
      marginTop: 10,
    },
    bulletItem: {
      fontSize: 16,
      color: 'gray',
      marginVertical: 2,
      lineHeight: 22,
    },
});
  