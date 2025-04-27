import { Tabs } from 'expo-router';
import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs>
        {/* Main For You Page */}
        <Tabs.Screen 
            name="index" 
            options={{ 
                title: "For You",
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'home' : 'home-outline' } color={color} size={24} />
                ),
                tabBarLabel: "For You", 
            }} 
        />
        <Tabs.Screen 
            name="itinerary" 
            options={{ 
                title: "Itinerary",
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'airplane' : 'airplane-outline' } color={color} size={24} />
                ),
                tabBarLabel: "Itinerary", 
            }} 
        />
        <Tabs.Screen 
            name="resources" 
            options={{ 
                title: "Resources",
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'library' : 'library-outline' } color={color} size={24} />
                ),
                tabBarLabel: "Resources", 
            }} 
        />
    </Tabs>
  );
}
