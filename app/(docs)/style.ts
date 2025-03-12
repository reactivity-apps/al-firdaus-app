import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
      paddingBottom: 40
    },
    header: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 10,
    },
     description: {
      fontSize: 16,
      color: 'gray',
      lineHeight: 22,
    },
    subHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 6,
    },
    image: {
      width: '100%',
      height: 550, // Bigger image for a more immersive experience
      marginBottom: 10,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    hotelContainer: {
      marginTop: 20,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      padding: 15,
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
  