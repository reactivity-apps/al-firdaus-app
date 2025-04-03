import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { style as styles } from "@/styles/docs";

const JeddahStay: React.FC = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Intro Section */}
        <Text style={styles.header}>Stay in Jeddah</Text>
        <Text style={styles.subHeader}>Learn more about your stay in Jeddah.</Text>
        
        <Image source={require('../../assets/images/jeddah.jpg')} style={styles.image} resizeMode="cover"/>
        <Text style={styles.description}>
          Jeddah, the **Gateway to Mecca**, is a vibrant coastal city along the Red Sea in Saudi Arabia. 
          Known for its stunning waterfront, rich history, and modern attractions, Jeddah is a major 
          entry point for Hajj and Umrah pilgrims. Visitors can explore landmarks like the King Fahd 
          Fountain, Al-Balad (the historic old town), and the beautiful Jeddah Corniche.
        </Text>

        {/* Accommodation Overview */}
        <Text style={[styles.sectionHeader, { marginTop: 20 }]}>Accommodation</Text>
        <Text style={styles.description}>
          Jeddah offers a mix of luxury resorts, business hotels, and budget-friendly stays. Many 
          high-end hotels offer stunning sea views and world-class hospitality. Below is one of 
          the best 5-star hotels in Jeddah.
        </Text>

        {/* Example of a 5-Star Hotel */}
        <View style={styles.hotelContainer}>
          <Text style={styles.sectionHeader}>The Ritz-Carlton, Jeddah</Text>
          <Text style={styles.description}>
            The Ritz-Carlton, Jeddah is a prestigious 5-star hotel that offers breathtaking views of 
            the Red Sea, exceptional service, and luxurious accommodations:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Elegant rooms and suites with Red Sea or city views</Text>
            <Text style={styles.bulletItem}>• Fine dining restaurants offering international and Arabic cuisine</Text>
            <Text style={styles.bulletItem}>• Spa, wellness center, and high-end fitness facilities</Text>
            <Text style={styles.bulletItem}>• Close to Jeddah Corniche and popular landmarks</Text>
            <Text style={styles.bulletItem}>• World-class business and conference facilities</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default JeddahStay;
