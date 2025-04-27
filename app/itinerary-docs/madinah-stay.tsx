import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { docStyles } from "@/styles/docs";

const MadinahStay: React.FC = () => {
  return (
    <ScrollView>
      <View style={docStyles.container}>
        {/* Intro Section */}
        <Text style={docStyles.header}>Stay in Madinah</Text>
        <Text style={docStyles.subHeader}>Learn more about your stay in Madina al-Munawara.</Text>
        
        <Image source={require('../../assets/images/madina.jpg')} style={docStyles.image} resizeMode="cover"/>
        <Text style={docStyles.description}>
          Madinah (Medina), known as the “City of the Prophet,” is the second holiest city in Islam, 
          located in western Saudi Arabia. It is home to Al-Masjid an-Nabawi, the Prophet Muhammad's 
          mosque, which contains his tomb. Pilgrims visiting for Hajj or Umrah often travel here to 
          offer prayers and visit significant historical sites such as Quba Mosque and Jannat al-Baqi.
        </Text>

        {/* Accommodation Overview */}
        <Text style={[docStyles.sectionHeader, { marginTop: 20 }]}>Accommodations</Text>
        <Text style={docStyles.description}>
          Madinah offers a wide range of accommodations, from budget hotels to luxurious five-star 
          stays. Many hotels are located near Al-Masjid an-Nabawi for easy access to prayer services.
          Below is one of the top-rated 5-star hotels in Madinah.
        </Text>

        {/* Example of a 5-Star Hotel */}
        <View style={docStyles.hotelContainer}>
          <Text style={docStyles.sectionHeader}>Shaza Al Madina</Text>
          <Text style={docStyles.description}>
            Shaza Al Madina is a luxury 5-star hotel located just a short walk from Al-Masjid an-Nabawi.
            Known for its elegant interiors and excellent hospitality, the hotel offers:
          </Text>
          <View style={docStyles.bulletList}>
            <Text style={docStyles.bulletItem}>• Spacious rooms with Arabian and Andalusian-inspired designs</Text>
            <Text style={docStyles.bulletItem}>• A selection of fine dining restaurants with Middle Eastern cuisine</Text>
            <Text style={docStyles.bulletItem}>• Easy access to Al-Masjid an-Nabawi for prayer</Text>
            <Text style={docStyles.bulletItem}>• Exclusive spa and wellness facilities for relaxation</Text>
            <Text style={docStyles.bulletItem}>• Dedicated prayer areas and serene ambiance</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MadinahStay;
