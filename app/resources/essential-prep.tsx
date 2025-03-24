import React from "react";
import { ScrollView, Text, View } from "react-native";
import { globalStyles } from "@/common/style";
import Dropdown from "@/components/Dropdown";

const EssentialPreparations = () => {
  const resourceItems = [
    {
      title: "Essential Resources",
      content: [
        { label: "Ziyarat (Info & Maps)", link: "/", showIcon: true },
        { label: "Essential Preparations", link: "/../resources/essential-prep", showIcon: true },
        { label: "Trip-Specific FAQs", link: "/", showIcon: true },
      ],
    },
    {
      title: "Travel Guides",
      content: [
        { label: "Destination Guide", link: "/", showIcon: true },
        { label: "Travel Tips", link: "/../resources/travel-tips", showIcon: true },
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

        <Dropdown items={resourceItems} />
      </View>
    </ScrollView>
  );
};

export default EssentialPreparations;