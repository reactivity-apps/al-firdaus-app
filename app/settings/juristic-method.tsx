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

const schoolMap: { [key: string]: number } = {
    "Shafi (Default)" : 0,
    "Hanafi": 1,
};

const schoolMapNumbers: { [key: number]: string } = Object.fromEntries(
    Object.entries(schoolMap).map(([name, number]) => [number, name])
);

const JuristicMethod = () => {
    const [juristicMethod, setJuristicMethod] = useState<string | null>(null);

    useEffect(() => {
        const fetchCurrentJuristicMethod = async () => {
            try {
                const schoolNumber = await cache.get("juristic-method");
    
                if (schoolNumber !== null && schoolNumber !== undefined) {
                    const parsed = Number(schoolNumber);
                    const schoolName = schoolMapNumbers[parsed];
                    
                    if (schoolName) {
                        setJuristicMethod(schoolName);
                    } else {
                        setJuristicMethod("Shafi (Default)");
                        console.log("No method set, using default");
                    }
                }
            } catch (error) {
                console.log("Failed to fetch juristic method from cache:", error);
            }
        };
    
        fetchCurrentJuristicMethod();
    }, []);
    
    const cacheJuristcMethod = async (value: React.SetStateAction<string | null>) => {
        try {
            await cache.set("juristic-method", JSON.stringify(schoolMap[value as string]));
            setJuristicMethod(value);

            console.log("Location cached:", location);
            if (Platform.OS === "web") {
                alert(`Successfully set juristic method to ${value}.`);
            } else {
                Alert.alert("Success", `Successfully set juristic method to ${value}.`);
            }
        } catch (error) {
            console.log("Failed to cache juristic method:", error);
            if (Platform.OS === "web") {
                alert(`Failed to set juristic method: ${error}`);
            } else {
                Alert.alert("Error", `Failed to set juristic method: ${error}`);
            }
        }
    }

    return (
        <ScrollView>
            <View style={globalStyles.container}>
                <Text style={globalStyles.header}>Juristic Method</Text>
                <Text style={globalStyles.subHeader}>
                    Set your preference for how prayer times are calculated.
                    {(juristicMethod) ? 
                        ` Current juristic method is ${juristicMethod}.` : 
                        " Current juristic method is Shafi (Default)."
                    }
                </Text>

                <SelectableMenu
                    title="Select a method:"
                    content={[
                        "Shafi (Default)",
                        "Hanafi",
                    ]}
                    selectedValue={juristicMethod || ""}
                    onSelect={(value) => cacheJuristcMethod(value)}
                />
                
            </View>
        </ScrollView>
    );
};

export default JuristicMethod;
