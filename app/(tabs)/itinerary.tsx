import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { style as globalStyles } from "@/styles/global";

const Timeline = () => (
  <View style={styles.timelineContainer}>
    <Text style={styles.timelineTitle}>📍 Trip Timeline</Text>
    <View style={styles.timelineBox}>
      {[
        {
          location: "King Abdul-Aziz International Airport",
          description: "Arrival into Saudi Arabia begins here.",
          icon: "airplane",
          dates: "4/16",
        },
        {
          location: "Jeddah",
          description: "Rest at the Red Sea and begin your spiritual journey.",
          icon: "beach",
          dates: "4/16–4/18",
        },
        {
          location: "Madina",
          description: "Visit the Prophet’s Mosque and historical sites.",
          icon: "mosque",
          dates: "4/18–4/20",
        },
        {
          location: "Makkah",
          description: "Complete your Umrah and climb Jabal Noor.",
          icon: "kaaba",
          dates: "4/20–4/26",
        },
      ].map((day, index, arr) => (
        <React.Fragment key={day.location}>
          <ItineraryDay 
            location={day.location} 
            description={day.description} 
            icon={day.icon} 
            dates={day.dates} 
          />
          {index < arr.length - 1 && <View style={styles.dividerLine} />}
        </React.Fragment>
      ))}
    </View>
  </View>
);

const ItineraryDay = ({ location, description, icon, dates }: { location: string, description: string, icon: string, dates: string }) => {
  const renderIcon = () => {
    switch(icon) {
      case 'airplane':
        return <Ionicons name="airplane" size={24} color="#555" />;
      case 'beach':
        return <MaterialCommunityIcons name="palm-tree" size={24} color="#555" />;
      case 'mosque':
        return <FontAwesome5 name="mosque" size={24} color="#555" />;
      case 'kaaba':
        return <FontAwesome5 name="kaaba" size={24} color="#555" />;
      default:
        return <Ionicons name="location" size={24} color="#555" />;
    }
  };

  return (
    <View style={styles.itineraryItem}>
      <View style={styles.itineraryContent}>
        {/* <View style={styles.iconContainer}>
          {renderIcon()}
        </View> */}
        <View style={styles.itineraryTextContainer}>
          <Text style={styles.itineraryText}>{location}</Text>
          <Text style={styles.itineraryDescription}>{description}</Text>
        </View>
      </View>
      <View style={styles.itineraryDate}>
        <Text style={styles.dateText}>{dates}</Text>
      </View>
    </View>
  );
};

const StayDetails = ({ title, days, link, image }: { title: string, days: string, link: string, image: any }) => (
  <Link href={link} asChild>
    <TouchableOpacity style={styles.stayContainer} activeOpacity={0.7}>
      <View style={styles.stayImageWrapper}>
        <Image source={image} style={styles.stayImage} />
        <LinearGradient 
          colors={["transparent", "rgba(0,0,0,0.7)"]} 
          style={styles.gradientOverlay}
        />
        <View style={styles.textOverlay}>
          <Text style={styles.dayLabel}>{days}</Text>
          <Text style={styles.stayHeaderTitle}>{title}</Text>
          <Text style={styles.stayDescriptionTitle}>Discover accommodations and plans for your stay.</Text>
        </View>
      </View>
    </TouchableOpacity>
  </Link>
);

const ItineraryScreen = () => (
  <ScrollView style={globalStyles.container} contentContainerStyle={styles.scrollContent}>
    <Text style={globalStyles.header}>Itinerary</Text>
    <Text style={globalStyles.subHeader}>View trip timeline and see a detailed breakdown of each stay.</Text>
    <Timeline />
    <Text style={styles.stayTitle}>Location Details</Text>
    <StayDetails 
      title="Stay in Jeddah" 
      days="Day 1 - 2" 
      link="/itinerary-docs/jeddah-stay"
      image={require('../../assets/images/jeddah.jpg')} />
    <StayDetails 
      title="Stay in Madinah" 
      days="Day 3 - 6" 
      link="/itinerary-docs/madinah-stay"
      image={require('../../assets/images/madina.jpg')} />
    <StayDetails 
      title="Stay in Makkah" 
      days="Day 7 - 12" 
      link="/itinerary-docs/makkah-stay" 
      image={require('../../assets/images/makkah.jpg')} />
  </ScrollView>
);

export default ItineraryScreen;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  timelineContainer: {
    marginBottom: 30,
  },
  timelineTitle: {
    fontSize: 15,
    color: "gray",
    marginBottom: 10,
  },
  timelineBox: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CDCBCB",
  },
  dividerLine: {
    height: 1,
    backgroundColor: "#ccc",
  },
  itineraryItem: {
    flexDirection: "row",
    padding: 15,
    alignItems: "center",
  },
  itineraryDate: {
    alignItems: "flex-end",
    width: 80,
  },
  dateText: {
    fontSize: 14,
  },
  itineraryContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  // iconContainer: {
  //   marginRight: 10,
  //   width: 32,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  itineraryTextContainer: {
    flex: 1,
  },
  itineraryText: {
    fontSize: 16,
    fontWeight: "500",
  },
  itineraryDescription: {
    fontSize: 14,
    color: "gray",
  },
  stayContainer: {
    marginVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  stayImageWrapper: {
    position: "relative",
    width: "100%",
    height: 400,
  },
  stayImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "40%", // Covers bottom for readability
  },
  textOverlay: {
    position: "absolute",
    bottom: 15,
    left: 15,
    right: 15,
  },
  stayHeaderTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  stayDescriptionTitle: {
    fontSize: 18,
    color: "white",
    marginTop: 4,
  },
  dayLabel: {
    fontSize: 15,
    color: "white",
    marginTop: 4,
  },
  stayTitle: {
    fontSize: 15,
    color: "gray",
    marginBottom: 5,
  },
});