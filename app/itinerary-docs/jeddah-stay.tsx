import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { style as styles } from '@/styles/docs';

const JeddahStay: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#fff' }}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={[styles.header, { marginBottom: 10 }]}>🌊 Stay in Jeddah</Text>
        <Text style={[styles.subHeader, { marginBottom: 20 }]}>
          The gateway to your journey — welcome to the Red Sea coast
        </Text>

        {/* Image */}
        <Image
          source={require('../../assets/images/jeddah.jpg')}
          style={[styles.image, { borderRadius: 12, marginBottom: 20 }]}
          resizeMode="cover"
        />

        {/* Intro Description */}
        <Text style={[styles.description, { marginBottom: 20 }]}>
          Jeddah, the vibrant coastal city along the Red Sea, is a key starting point for pilgrims 
          visiting Makkah and Madinah. Known for its culture, hospitality, and scenic beauty, 
          it's where your Al-Firdaus journey begins.
        </Text>

        {/* Hotel Info */}
        <Text style={[styles.sectionHeader, { marginBottom: 10 }]}>🏨 Where You’ll Stay</Text>
        <Text style={[styles.sectionHeader, { fontSize: 20, marginBottom: 10 }]}>
          Narcissus Obhur Resort & Spa
        </Text>
        <Text style={[styles.description, { marginBottom: 15 }]}>
          A beachfront escape along the Red Sea, this resort is known for its peaceful atmosphere 
          and exclusive facilities, including:
        </Text>
        <View style={[styles.bulletList, { marginBottom: 20 }]}>
          <Text style={styles.bulletItem}><Icon name="female" size={16} />  Fully-secluded women-only beach (summer only)</Text>
          <Text style={styles.bulletItem}><Icon name="spa" size={16} />  Women-only outdoor pool & private spa</Text>
          <Text style={styles.bulletItem}><Icon name="home" size={16} />  Private villas with outdoor pools or hot tubs</Text>
          <Text style={styles.bulletItem}><Icon name="wifi" size={16} />  Free Wi-Fi and in-room amenities</Text>
          <Text style={styles.bulletItem}><Icon name="car" size={16} />  Private parking and premium service</Text>
        </View>

        {/* Activities Section */}
        <Text style={[styles.sectionHeader, { marginBottom: 10 }]}>📅 Key Activities in Jeddah</Text>
        <View style={[styles.bulletList, { marginBottom: 30 }]}>
          <Text style={styles.bulletItem}><Icon name="plane" size={16} />  Feb 14: Arrival Day — Meet & rest at the villa resort</Text>
          <Text style={styles.bulletItem}><Icon name="sign-out" size={16} />  Feb 15: Checkout by 12 PM & depart to Madinah</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default JeddahStay;

