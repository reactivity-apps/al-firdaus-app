import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { style as styles } from '@/styles/docs';

const MadinahStay: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={[styles.header, { marginBottom: 10 }]}>🕌 Stay in Madinah</Text>
        <Text style={[styles.subHeader, { marginBottom: 20 }]}>
          Your peaceful stay in the City of the Prophet ﷺ
        </Text>

        {/* Image */}
        <Image
          source={require('../../assets/images/madina.jpg')}
          style={[styles.image, { borderRadius: 12, marginBottom: 20 }]}
          resizeMode="cover"
        />

        {/* Intro Description */}
        <Text style={[styles.description, { marginBottom: 20 }]}>
          Madinah (Medina), known as the “City of the Prophet,” is the second holiest city in Islam. 
          It is home to Al-Masjid an-Nabawi, the Prophet Muhammad’s ﷺ mosque, and a spiritual destination 
          where millions come to offer prayers and reflect on his legacy.
        </Text>

        {/* Hotel Info */}
        <Text style={[styles.sectionHeader, { marginBottom: 10 }]}>🏨 Where You’ll Stay</Text>
        <Text style={[styles.sectionHeader, { fontSize: 20, marginBottom: 10 }]}>
          Dar Aleiman Al Haram
        </Text>
        <Text style={[styles.description, { marginBottom: 15 }]}>
          This beautiful 5-star hotel is located within walking distance of Masjid An-Nabawi and offers:
        </Text>
        <View style={[styles.bulletList, { marginBottom: 20 }]}>
          <Text style={styles.bulletItem}><Icon name="wifi" size={16} />  Free Wi-Fi & Good Breakfast</Text>
          <Text style={styles.bulletItem}><Icon name="car" size={16} />  Private Parking & Room Service</Text>
          <Text style={styles.bulletItem}><Icon name="cutlery" size={16} />  On-site Restaurants</Text>
          <Text style={styles.bulletItem}><Icon name="wheelchair" size={16} />  Accessibility Features</Text>
          <Text style={styles.bulletItem}><Icon name="home" size={16} />  Family Rooms & Laundry Service</Text>
        </View>

        {/* Itinerary Highlights */}
        <Text style={[styles.sectionHeader, { marginBottom: 10 }]}>📅 Key Activities in Madinah</Text>
        <View style={[styles.bulletList, { marginBottom: 30 }]}>
          <Text style={styles.bulletItem}><Icon name="calendar" size={16} />  Feb 15: Check-in + Intro & Tour of Masjid Nabawi</Text>
          <Text style={styles.bulletItem}><Icon name="moon-o" size={16} />  Feb 16–18: Tahajjud (brothers), reminders with Riyad</Text>
          <Text style={styles.bulletItem}><Icon name="cutlery" size={16} />  Feb 18: Camel meat dinner at Hashi Bashi + Umrah seminar</Text>
          <Text style={styles.bulletItem}><Icon name="university" size={16} />  Feb 18 Night: Visit museums after Isha</Text>
          <Text style={styles.bulletItem}><Icon name="map" size={16} />  Feb 20: Ziyara tour after Dhuhr + final reminder</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MadinahStay;
