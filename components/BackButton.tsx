import React from "react";
import { Link } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet } from "react-native";

type Props = {
    route: String;
}

export default function BackButton({ route }: Props) {
    return (
        <Link href={route} asChild>
            <View style={styles.backButton}>
                <Ionicons 
                    name="chevron-back-outline" 
                    style={styles.backButtonIcon}
                ></Ionicons>
                <Text>Back</Text>
            </View>        
        </Link>
    );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  backButtonIcon: {
    fontSize: 16,
  }
});