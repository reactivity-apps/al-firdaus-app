import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { style as styles } from "@/styles/docs";

const MakkahScreen: React.FC = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Intro Section */}
        <Text style={styles.header}>Stay in Makkah</Text>
        <Text style={styles.subHeader}>Learn more about your stay in Makkah al-Mukarramah.</Text>

        <Image source={require('../../assets/images/makkah.jpg')} style={styles.image} resizeMode="cover"/>
        <Text style={styles.description}>
          Makkah (Mecca) is the holiest city in Islam, located in the Hejaz region 
          of Saudi Arabia. Home to Masjid al-Haram and the Kaaba—the most sacred site 
          in Islam—Makkah welcomes millions of pilgrims each year during Hajj and Umrah.
        </Text>

        {/* Accommodation Overview */}
        <Text style={[styles.sectionHeader, { marginTop: 20 }]}>Accommodations</Text>
        <Text style={styles.description}>
          From budget-friendly to luxury five-star hotels, Makkah offers a variety of 
          accommodations to suit travelers’ needs. Below is a popular 5-star hotel 
          often praised for its proximity and amenities.
        </Text>

        {/* Example of a 5-Star Hotel */}
        <View style={styles.hotelContainer}>
          <Text style={styles.sectionHeader}>Fairmont Makkah Clock Royal Tower</Text>
          <Text style={styles.description}>
            The Fairmont Makkah Clock Royal Tower is an iconic 5-star hotel situated 
            steps away from Masjid al-Haram. It features:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Luxury rooms & suites with panoramic views of the Holy City</Text>
            <Text style={styles.bulletItem}>• Multiple dining options offering international cuisine</Text>
            <Text style={styles.bulletItem}>• Direct access to the Al Haram plaza</Text>
            <Text style={styles.bulletItem}>• Spa, fitness center, and exclusive amenities</Text>
            <Text style={styles.bulletItem}>• A prime location in the Abraj Al Bait complex</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MakkahScreen;
