import { globalStyles } from "@/styles/global";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import cache from "@/api/cache";

type CityCountry = {
  city: string;
  region: string;
  countryCode: string;
};

// TODO: add API for country data
const staticCities: CityCountry[] = [
  { city: "New York", region: "New York", countryCode: "US" },
  { city: "Los Angeles", region: "California", countryCode: "US" },
  { city: "Toronto", region: "Ontario", countryCode: "CA" },
  { city: "Paris", region: "Île-de-France", countryCode: "FR" },
  { city: "Tokyo", region: "Tokyo", countryCode: "JP" },
  { city: "London", region: "England", countryCode: "GB" },
  { city: "Cairo", region: "Cairo", countryCode: "EG" },
  { city: "Berlin", region: "Berlin", countryCode: "DE" },
  { city: "Columbus", region: "Ohio", countryCode: "US" },

];

const LocationDetails = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false); // Will be used for api

  const filtered = staticCities.filter((item) =>
    `${item.city}, ${item.region}, ${item.countryCode}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  const handleLocationSelect = async (location: CityCountry) => {
    try {
      await cache.set("location", JSON.stringify(location));
      
      console.log("Location cached:", location);
      if(Platform.OS === "web"){
        alert(`Successfully set location to ${location.city}.`)
      } else {
        Alert.alert("Success", `Successfully set location to ${location.city}.`);
      }
    } catch (error) {
      console.log("Failed to cache location:", error);
      if(Platform.OS === "web"){
        alert(`Failed to set location: ${error}.`)
      } else {
        Alert.alert("Error", `Failed to set location: ${error}.`);
      }
    }
  };
  

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Details</Text>
          <TextInput
            style={styles.input}
            placeholder="Search for a city..."
            placeholderTextColor="grey"
            value={query}
            onChangeText={setQuery}
          />
          <View style={styles.rowContainer}>
            {loading ? (
              <View style={styles.centerContent}>
                <ActivityIndicator size="small" color="black" />
              </View>
            ) : filtered.length !== 0 && query.length >= 2 ? (
              filtered.map((item, index) => (
                <TouchableOpacity
                    onPress={() => handleLocationSelect(item)}
                    key={`${item.city}-${item.countryCode}`}
                    style={[
                    styles.row,
                    index === filtered.length - 1 && styles.lastRow,
                    ]}
                >
                    <Text style={styles.label}>
                    {item.city}, {item.region}, {item.countryCode}
                    </Text>
                </TouchableOpacity>
              ))
            ) : query.length >= 2 ? (
              <View style={styles.row}>
                <Text style={styles.label}>No results found</Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LocationDetails;

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 15,
    color: "gray",
    marginBottom: 10,
  },
  input: {
    height: 40,
    fontSize: 16,
    borderColor: "#CDCBCB",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  rowContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
  },
  row: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#CDCBCB",
    flexWrap: "wrap",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
  },
  label: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  lastRow: {
    borderBottomWidth: 0,
  },
});
