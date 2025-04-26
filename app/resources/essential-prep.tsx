import React from "react";
import { ScrollView, Text, View } from "react-native";
import { style as globalStyles } from "@/styles/global";
import Dropdown from "@/components/Dropdown";

const EssentialPreparations = () => {
  // Example usage
  const resourceItems = [
    {
      title: "Spiritual Preparation",
      content: [
        { label: "Significance of Umrah", link: "resources/docs/spiritual-1", showIcon: true },
      ],
    },

  ];

  return (
    <ScrollView>
      <View style={globalStyles.container}>
        <Text style={globalStyles.header}>Essential Preparations</Text>
        <Text style={globalStyles.subHeader}>
          Prepare for your journey with key resources, including travel guidelines, 
          packing checklists, and important tips to ensure a hassle-free experience.
        </Text>

        {/* Can create multiple dropdowns */}
        <Dropdown title={"Travel Preparation"} items={resourceItems} />

      </View>
    </ScrollView>
  );
};

export default EssentialPreparations;