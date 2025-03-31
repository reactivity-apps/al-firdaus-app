import React from "react";
import { ScrollView, Text, View } from "react-native";
import { style as globalStyles } from "@/styles/global";
import Dropdown from "@/components/Dropdown";

const EssentialPreparations = () => {
  // Example usage
  const resourceItems = [
    {
      title: "Resource 1",
      content: [
        { label: "Resource 1", link: "resources/docs/resource-1", showIcon: true },
        { label: "Resource 2", link: "resources/docs/resource-1", showIcon: true },
        { label: "Resource 3", link: "resources/docs/resource-1", showIcon: true },
      ],
    },
    {
      title: "Resource 2",
      content: [
        { label: "Resource 1", link: "resources/docs/resource-1", showIcon: true },
        { label: "Resource 2", link: "resources/docs/resource-1", showIcon: true },
        { label: "Resource 3", link: "resources/docs/resource-1", showIcon: true },
      ],
    }
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
        <Dropdown items={resourceItems} />
        <Dropdown items={resourceItems} />
      </View>
    </ScrollView>
  );
};

export default EssentialPreparations;