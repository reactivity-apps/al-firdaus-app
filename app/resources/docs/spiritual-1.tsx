import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { docStyles } from "@/styles/docs";

const UnderstandingRituals = () => {
  return (
    <ScrollView>
      <View style={docStyles.container}>
        <Text style={docStyles.header}>Understanding the Rituals of Umrah</Text>
        <Text style={docStyles.subHeader}>A step-by-step guide to performing Umrah.</Text>
        <Image source={require('../../../assets/images/makkah.jpg')} style={docStyles.image} resizeMode="cover" />
        <Text style={docStyles.description}>
          Umrah is a deeply spiritual journey undertaken by Muslims to seek closeness to Allah. It consists of several key rituals performed at Masjid al-Haram in Makkah. Below is a detailed guide to each step of the Umrah pilgrimage.
        </Text>

        <View style={docStyles.sectionContainer}>
          <Text style={docStyles.sectionHeader}>1. Ihram (State of Purity)</Text>
          <Text style={docStyles.description}>
            Before entering Makkah, pilgrims must enter the state of Ihram. This involves wearing the prescribed attire (two white sheets for men and modest clothing for women) and making the intention (Niyyah) at the Miqat boundary.
          </Text>
        </View>

        <View style={docStyles.sectionContainer}>
          <Text style={docStyles.sectionHeader}>2. Tawaf (Circumambulation)</Text>
          <Text style={docStyles.description}>
            Pilgrims circle the Kaaba seven times in an anti-clockwise direction while making prayers and supplications. Tawaf is a symbol of devotion and unity among Muslims.
          </Text>
        </View>

        <View style={docStyles.sectionContainer}>
          <Text style={docStyles.sectionHeader}>3. Sa’i (Walking between Safa and Marwah)</Text>
          <Text style={docStyles.description}>
            Pilgrims walk seven times between the hills of Safa and Marwah, retracing the steps of Hagar, who searched for water for her son, Prophet Ismail.
          </Text>
        </View>

        <View style={docStyles.sectionContainer}>
          <Text style={docStyles.sectionHeader}>4. Tahallul (Shaving or Trimming Hair)</Text>
          <Text style={docStyles.description}>
            To complete Umrah, men shave or trim their hair, and women cut a small portion. This symbolizes purification and renewal of faith.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default UnderstandingRituals;
