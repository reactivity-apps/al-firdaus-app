import { globalStyles } from "@/styles/global";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import cache from "@/api/cache";
import SelectableMenu from "@/components/SelectableMenu";

// TODO: Add dark and system mode functionality
const SystemTheme = () => {
    const [systemTheme, setSystemTheme] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrentTheme = async () => {
            try {
                const theme = await cache.get("system-theme");
                if (theme) {
                    setSystemTheme(JSON.parse(theme));
                } else {
                    setSystemTheme("System");
                }
            } catch (error) {
                console.log("Failed to fetch system theme from cache:", error);
            }
        };
    
        fetchCurrentTheme();
    }, []);
    
    const cacheSystemTheme = async (value: React.SetStateAction<string | null>) => {
        try {
            await cache.set("system-theme", JSON.stringify(value));
            setSystemTheme(value);

            if (Platform.OS === "web") {
                alert(`Successfully set system theme to ${value}.`);
            } else {
                Alert.alert("Success", `Successfully set system theme to ${value}.`);
            }
        } catch (error) {
            console.log("Failed to cache system theme:", error);
            if (Platform.OS === "web") {
                alert(`Failed to set system theme: ${error}`);
            } else {
                Alert.alert("Error", `Failed to set system theme: ${error}`);
            }
        }
    }

    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <Text style={globalStyles.header}>System Theme</Text>
                <Text style={globalStyles.subHeader}>
                    Choose your preferred app appearance. You can follow your device's system setting or manually switch between light and dark mode.
                </Text>

                <SelectableMenu
                    title="Select a method:"
                    content={[
                        "Dark",
                        "Light",
                        "System"
                    ]}
                    selectedValue={systemTheme || ""}
                    onSelect={(value) => cacheSystemTheme(value)}
                />
            </View>
        </ScrollView>
    );
};

export default SystemTheme;
