import React from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native";
import { globalStyles } from "@/styles/global";
import Menu from "@/components/Menu";

const Resources = () => {
  return (
    <ScrollView style={globalStyles.container}>
        <Text style={globalStyles.header}>Resources</Text>
        <Text style={globalStyles.subHeader}>Access essential information to make your journey smooth and stress-free.</Text>

        <Menu
            title="Essential Resources"
            content={[
                { label: "Ziyarat Locations (Info & Maps)", link: "/", showIcon: true },
                { label: "Useful Duas", link: "/", showIcon: true },
                { label: "Umrah Guide", link: "/umrah-guide", showIcon: true },
                { label: "Essential Preparations", link: "/../resources/essential-prep", showIcon: true },
                { label: "Trip-Specific FAQs", link: "/", showIcon: true },
            ]}
        />

        <Menu
            title="Contact"
            content={[
                { label: "Guide Contact", link: "/", showIcon: true },
                { label: "Developer Contact", link: "/", showIcon: true },
            ]}
        />
    </ScrollView>
  );
};


export default Resources;

