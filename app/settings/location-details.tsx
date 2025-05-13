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
import { countryCityData } from "@/api/countryCityData"; // Adjust path as needed

type CityCountry = {
  city: string;
  country: string;
  iso2: string;
};

const LocationDetails = () => {
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [cities, setCities] = useState<CityCountry[]>([]);

    const [filtering, setFiltering] = useState(false);
    const [filteredCities, setFilteredCities] = useState<CityCountry[]>([]);

    // grab cities object from api
    useEffect(() => {
        setLoading(true);
        const seen = new Set<string>();
        const cities: CityCountry[] = countryCityData.flatMap((entry) =>
            entry.cities
                .map((city) => ({
                    city,
                    country: entry.country,
                    iso2: entry.iso2,
                }))
                .filter((item) => {
                    const key = `${item.city.toLowerCase()},${item.country.toLowerCase()},${item.iso2}`;
                    if (seen.has(key)) return false;
                    seen.add(key);
                    return true;
                })
        );

        setCities(cities);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (query.length < 2) {
            setFilteredCities([]);
            setFiltering(false); // make sure to reset loading state
            return;
        }

        setFiltering(true);
        const filtered = cities.filter((item) =>
            `${item.city}, ${item.country}, ${item.iso2}`
                .toLowerCase()
                .includes(query.toLowerCase())
        );

        setFilteredCities(filtered);
        setFiltering(false);
    }, [query, cities]);
  
    const handleLocationSelect = async (location: CityCountry) => {
        try {
            await cache.set("location", JSON.stringify(location));
            console.log("Location cached:", location);
            if (Platform.OS === "web") {
                alert(`Successfully set location to ${location.city}.`);
            } else {
                Alert.alert("Success", `Successfully set location to ${location.city}.`);
            }
        } catch (error) {
            console.log("Failed to cache location:", error);
            if (Platform.OS === "web") {
                alert(`Failed to set location: ${error}`);
            } else {
                Alert.alert("Error", `Failed to set location: ${error}`);
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
                    ) : filtering ? (
                        <View style={styles.centerContent}>
                            <ActivityIndicator size="small" color="black" />
                        </View>
                    ) : filteredCities.length !== 0 && query.length >= 2 ? (
                        filteredCities.map((item, index) => (
                            <TouchableOpacity
                                onPress={() => handleLocationSelect(item)}
                                key={`${item.city}-${item.iso2}`}
                                style={[
                                    styles.row,
                                    index === filteredCities.length - 1 && styles.lastRow,
                                ]}
                            >
                                <Text style={styles.label}>
                                    {item.city}, {item.country}, {item.iso2}
                                </Text>
                            </TouchableOpacity>
                        ))
                    ) : query.length >= 2 ? (
                        <View style={[styles.row, styles.lastRow]}>
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
