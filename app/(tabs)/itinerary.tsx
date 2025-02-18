import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; // Import arrow icon

// Define navigation type
type RootStackParamList = {
  Itinerary: undefined;
  makkahscreen: undefined;
  jeddahscreen: undefined;
  madinahscreen: undefined;
};

type ItineraryScreenNavigationProp = StackNavigationProp<RootStackParamList, "Itinerary">;

// Timeline Component (Unchanged)
const Timeline = () => {
  return (
    <View style={styles.timelineContainer}>
      <Text style={styles.timelineTitle}>Trip Timeline</Text>
      <View style={styles.timelineBox}>
        <Text style={styles.timelineHeader}>Arrive at King AbdulAziz Airport</Text>
        <Text style={styles.timelineDots}>...</Text>
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
  const navigation = useNavigation<ItineraryScreenNavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.header}>Itinerary</Text>
      <TextInput style={styles.searchBar} placeholder="Search" />
      <Timeline />

      {/* Stay in Makkah Section */}
      <TouchableOpacity style={styles.stayContainer} onPress={() => navigation.navigate("makkahscreen")}>
        {/* Day Label (Top Left) */}
        <Text style={styles.dayLabel}>Day 7 - 12</Text>

        {/* Main Content */}
        <View style={styles.stayContent}>
          <View style={styles.stayTextContainer}>
            <Text style={styles.stayHeader}>Stay in Makkah</Text>
            <Text style={styles.stayDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Discover accommodations and plans for your stay.
            </Text>
          </View>

          {/* Arrow Icon (Bottom Right) */}
          <Ionicons name="chevron-forward-outline" size={20} color="#000000" style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>

      {/* Stay in Jeddah Section (Added Separately) */}
      <TouchableOpacity style={styles.stayContainer} onPress={() => navigation.navigate("jeddahscreen")}>
        {/* Day Label (Top Left) */}
        <Text style={styles.dayLabel}>Day 1 - 2</Text>

        {/* Main Content */}
        <View style={styles.stayContent}>
          <View style={styles.stayTextContainer}>
            <Text style={styles.stayHeader}>Stay in Jeddah</Text>
            <Text style={styles.stayDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Discover accommodations and plans for your stay.
            </Text>
          </View>

          {/* Arrow Icon (Bottom Right) */}
          <Ionicons name="chevron-forward-outline" size={20} color="#000000" style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>

      {/* Stay in Madinah Section (Added Separately) */}
      <TouchableOpacity style={styles.stayContainer} onPress={() => navigation.navigate("jeddahscreen")}>
        {/* Day Label (Top Left) */}
        <Text style={styles.dayLabel}>Day 1 - 2</Text>

        {/* Main Content */}
        <View style={styles.stayContent}>
          <View style={styles.stayTextContainer}>
            <Text style={styles.stayHeader}>Stay in Madinah</Text>
            <Text style={styles.stayDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Discover accommodations and plans for your stay.
            </Text>
          </View>

          {/* Arrow Icon (Bottom Right) */}
          <Ionicons name="chevron-forward-outline" size={20} color="#000000" style={styles.arrowIcon} />
        </View>
      </TouchableOpacity>
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
    backgroundColor: "#000",
    color: "#fff",
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
    backgroundColor: "#f5f5f5",
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
  stayContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    position: "absolute",
    top: 10,
    right: 15,
  },
  stayContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
  },
  stayTextContainer: {
    flex: 1,
  },
  stayHeader: {
    fontSize: 16,
    top: -18,
    left: -15,
    fontWeight: "bold",
},
  stayDescription: {
    fontSize: 14,
    color: "gray",
  },
  arrowIcon: {
    position: "absolute",
    bottom: 4,
    right: 8,
  },
});
