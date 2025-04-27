import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { docStyles } from "@/styles/docs";

const MakkahStay: React.FC = () => {
  return (
    <ScrollView>
      <View style={docStyles.container}>
        {/* Intro Section */}
        <Text style={docStyles.header}>Stay in Makkah</Text>
        <Text style={docStyles.subHeader}>Learn more about your stay in Makkah al-Mukarramah.</Text>

        <Image source={require('../../assets/images/makkah.jpg')} style={docStyles.image} resizeMode="cover"/>
        <Text style={docStyles.description}>
          Makkah (Mecca) is the holiest city in Islam, located in the Hejaz region 
          of Saudi Arabia. Home to Masjid al-Haram and the Kaaba—the most sacred site 
          in Islam—Makkah welcomes millions of pilgrims each year during Hajj and Umrah.
        </Text>

        {/* Accommodation Overview */}
        <Text style={[docStyles.sectionHeader, { marginTop: 20 }]}>Accommodations</Text>
        <Text style={docStyles.description}>
          From budget-friendly to luxury five-star hotels, Makkah offers a variety of 
          accommodations to suit travelers’ needs. Below is a popular 5-star hotel 
          often praised for its proximity and amenities.
        </Text>

        {/* Example of a 5-Star Hotel */}
        <View style={docStyles.hotelContainer}>
          <Text style={docStyles.sectionHeader}>Fairmont Makkah Clock Royal Tower</Text>
          <Text style={docStyles.description}>
            The Fairmont Makkah Clock Royal Tower is an iconic 5-star hotel situated 
            steps away from Masjid al-Haram. It features:
          </Text>
          <View style={docStyles.bulletList}>
            <Text style={docStyles.bulletItem}>• Luxury rooms & suites with panoramic views of the Holy City</Text>
            <Text style={docStyles.bulletItem}>• Multiple dining options offering international cuisine</Text>
            <Text style={docStyles.bulletItem}>• Direct access to the Al Haram plaza</Text>
            <Text style={docStyles.bulletItem}>• Spa, fitness center, and exclusive amenities</Text>
            <Text style={docStyles.bulletItem}>• A prime location in the Abraj Al Bait complex</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MakkahStay;
