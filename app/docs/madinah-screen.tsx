import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { style as styles } from "@/styles/docs";

const MadinahScreen: React.FC = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Intro Section */}
        <Text style={styles.header}>Stay in Madinah</Text>
        <Text style={styles.subHeader}>Learn more about your stay in Madina al-Munawara.</Text>
        
        <Image source={require('../../assets/images/madina.jpg')} style={styles.image} resizeMode="cover"/>
        <Text style={styles.description}>
          Madinah (Medina), known as the “City of the Prophet,” is the second holiest city in Islam, 
          located in western Saudi Arabia. It is home to Al-Masjid an-Nabawi, the Prophet Muhammad's 
          mosque, which contains his tomb. Pilgrims visiting for Hajj or Umrah often travel here to 
          offer prayers and visit significant historical sites such as Quba Mosque and Jannat al-Baqi.
        </Text>

        {/* Accommodation Overview */}
        <Text style={[styles.sectionHeader, { marginTop: 20 }]}>Accommodations</Text>
        <Text style={styles.description}>
          Madinah offers a wide range of accommodations, from budget hotels to luxurious five-star 
          stays. Many hotels are located near Al-Masjid an-Nabawi for easy access to prayer services.
          Below is one of the top-rated 5-star hotels in Madinah.
        </Text>

        {/* Example of a 5-Star Hotel */}
        <View style={styles.hotelContainer}>
          <Text style={styles.sectionHeader}>Shaza Al Madina</Text>
          <Text style={styles.description}>
            Shaza Al Madina is a luxury 5-star hotel located just a short walk from Al-Masjid an-Nabawi.
            Known for its elegant interiors and excellent hospitality, the hotel offers:
          </Text>
          <View style={styles.bulletList}>
            <Text style={styles.bulletItem}>• Spacious rooms with Arabian and Andalusian-inspired designs</Text>
            <Text style={styles.bulletItem}>• A selection of fine dining restaurants with Middle Eastern cuisine</Text>
            <Text style={styles.bulletItem}>• Easy access to Al-Masjid an-Nabawi for prayer</Text>
            <Text style={styles.bulletItem}>• Exclusive spa and wellness facilities for relaxation</Text>
            <Text style={styles.bulletItem}>• Dedicated prayer areas and serene ambiance</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MadinahScreen;
