import { Tabs } from 'expo-router';
import Ionicons from "@expo/vector-icons/Ionicons";
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs>
        {/* Main For You Page */}
        <Tabs.Screen 
            name="for-you" 
            options={{ 
                title: "For You",
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'home' : 'home-outline' } color={color} size={24} />
                ),
                tabBarLabel: "For You", 
            }} 
        />
        <Tabs.Screen 
            name="index" 
            options={{ 
                title: "Announcements",
                tabBarIcon: ({ color, focused }) => (
                    <Ionicons name={focused ? 'list-circle' : 'list-circle-outline' } color={color} size={24} />
                ),
                tabBarLabel: "Announcements", 
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
    </Tabs>
  );
}
