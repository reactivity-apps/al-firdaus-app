import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { style as styles } from '@/styles/docs';

const MakkahStay: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {/* Header Section */}
        <Text style={[styles.header, { marginBottom: 10 }]}>🕋 Stay in Makkah</Text>
        <Text style={[styles.subHeader, { marginBottom: 20 }]}>
          Part of your blessed journey through Al-Firdaus
        </Text>

        {/* Image */}
        <Image
          source={require('../../assets/images/makkah.jpg')}
          style={[styles.image, { borderRadius: 12, marginBottom: 20 }]}
          resizeMode="cover"
        />

        {/* City Description */}
        <Text style={[styles.description, { marginBottom: 20 }]}>
          Makkah is the spiritual heart of Islam, home to Masjid Al-Haram and the Ka’aba. It is the
          final destination in your Umrah journey, filled with moments of reflection, worship, and
          unforgettable views.
        </Text>

        {/* Hotel Section */}
        <Text style={[styles.sectionHeader, { marginTop: 10, marginBottom: 10 }]}>
          🏨 Where You’ll Stay
        </Text>
        <Text style={[styles.sectionHeader, { fontSize: 20, marginBottom: 10 }]}>
          Swissotel Makkah
        </Text>
        <Text style={[styles.description, { marginBottom: 15 }]}>
          Located just 100 meters from Masjid Al-Haram, Swissotel Makkah offers a five-star stay
          overlooking the Ka’aba. It is part of the prestigious Abraj Al Bait complex and includes:
        </Text>
        <View style={[styles.bulletList, { marginBottom: 20 }]}>
          <Text style={styles.bulletItem}><Icon name="bed" size={16} />  Ka’aba view rooms</Text>
          <Text style={styles.bulletItem}><Icon name="location-arrow" size={16} />  Walking distance to Haram</Text>
          <Text style={styles.bulletItem}><Icon name="car" size={16} />  Private parking, room service, and laundry</Text>
          <Text style={styles.bulletItem}><Icon name="wifi" size={16} />  Free Wi-Fi and good breakfast</Text>
          <Text style={styles.bulletItem}><Icon name="wheelchair" size={16} />  Accessible for disabled guests</Text>
        </View>

        {/* Activities Section */}
        <Text style={[styles.sectionHeader, { marginTop: 10, marginBottom: 10 }]}>
          📅 Key Activities in Makkah
        </Text>
        <View style={[styles.bulletList, { marginBottom: 30 }]}>
          <Text style={styles.bulletItem}><Icon name="calendar" size={16} />  Feb 19: Umrah begins (1–2 AM)</Text>
          <Text style={styles.bulletItem}><Icon name="sun-o" size={16} />  Feb 21: Jummah + Jabal Noor sunset climb</Text>
          <Text style={styles.bulletItem}><Icon name="road" size={16} />  Feb 22: Half-day trip to Taif</Text>
          <Text style={styles.bulletItem}><Icon name="coffee" size={16} />  Feb 23: Final reflections at café after Maghrib</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default MakkahStay;

