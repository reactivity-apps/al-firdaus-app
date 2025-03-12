import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import arrow icon
import { globalStyles } from "@/common/style";

// Define navigation type
type RootStackParamList = {
  Itinerary: undefined;
  makkahscreen: undefined;
  jeddahscreen: undefined;
  madinahscreen: undefined;
};


// Timeline Component (Unchanged)
const Timeline = () => {
  return (
    <View style={styles.timelineContainer}>
      <Text style={styles.timelineTitle}>Trip Timeline</Text>
      <View style={styles.timelineBox}>
      <ItineraryDay location="Arrive at King Abdul Aziz Airport" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
      {/* <Text style={styles.timelineDots}>...</Text> */}
      <ItineraryDay location="Jeddah" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
      <ItineraryDay location="Madinah" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
       <ItineraryDay location="Makkah" description="Lorem ipsum dolor sit amet, consectetur adipiscing elit." />
      </View>
    </View>
  );
};

// Reusable Clickable Component for Itinerary Days
const ItineraryDay = ({ location, description, onPress }: { location: string; description: string; onPress?: () => void }) => {
  return (
    <TouchableOpacity style={styles.itineraryItem} onPress={onPress}>
      <View style={styles.circle} />
      <View style={styles.itineraryTextContainer}>
        <Text style={styles.itineraryText}>{location}</Text>
        <Text style={styles.itineraryDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const ItineraryScreen: React.FC = () => {
  return (
    <ScrollView style={globalStyles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={globalStyles.header}>Itinerary</Text>
      <TextInput style={styles.searchBar} placeholder="Search" />
      <Timeline />

      <Link href="/jeddah-screen" asChild>
        <TouchableOpacity style={styles.stayContainer} activeOpacity={0.7}>
          {/* Header and Day Label in a Row */}
          <View style={styles.headerRow}>
            <Text style={styles.stayHeader}>Stay in Jeddah</Text>
            <Text style={styles.dayLabel}>Day 1 - 2</Text>
          </View>

          {/* Description and Arrow in a Row */}
          <View style={styles.descriptionRow}>
            <Text style={styles.stayDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Discover accommodations and plans for your stay.
            </Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#000000" style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
      </Link>

      <Link href="/madinah-screen" asChild>
        <TouchableOpacity style={styles.stayContainer} activeOpacity={0.7}>
          {/* Header and Day Label in a Row */}
          <View style={styles.headerRow}>
            <Text style={styles.stayHeader}>Stay in Madinah</Text>
            <Text style={styles.dayLabel}>Day 3 - 6</Text>
          </View>

          {/* Description and Arrow in a Row */}
          <View style={styles.descriptionRow}>
            <Text style={styles.stayDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Discover accommodations and plans for your stay.
            </Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#000000" style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
      </Link>

      <Link href="/makkah-screen" asChild>
        <TouchableOpacity style={styles.stayContainer} activeOpacity={0.7}>
          <View style={styles.headerRow}>
            <Text style={styles.stayHeader}>Stay in Makkah</Text>
            <Text style={styles.dayLabel}>Day 7 - 12</Text>
          </View>

          <View style={styles.descriptionRow}>
            <Text style={styles.stayDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Discover accommodations and plans for your stay.
            </Text>
            <Ionicons name="chevron-forward-outline" size={20} color="#000000" style={styles.arrowIcon} />
          </View>
        </TouchableOpacity>
      </Link>


    </ScrollView>
  );
};


export default ItineraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  timelineContainer: {
    marginVertical: 10,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timelineBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
  },
  timelineHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timelineDots: {
    fontSize: 20,
    textAlign: "center",
  },
  itineraryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "gray",
    marginRight: 10,
  },
  itineraryTextContainer: {
    flex: 1,
  },
  itineraryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itineraryDescription: {
    fontSize: 14,
    color: "gray",
  },
  scrollContent: {
    flexGrow: 1, // Allows scrolling when content exceeds screen height
    paddingBottom: 30, // Prevents content from being cut off at the bottom
  },
  // Styles for Stay in Makkah Section
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10, 
  },
  descriptionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 60
  },
  stayContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  stayHeader: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
  },
  stayDescription: {
    fontSize: 14,
    color: "gray",
    flex: 1, // Allows text to take space and prevent overlap
    marginTop: 10,
    alignSelf: "flex-start"
  },
  arrowIcon: {
    marginLeft: 10, // Adds spacing between text and arrow
    alignSelf: "flex-end"
  },  

});