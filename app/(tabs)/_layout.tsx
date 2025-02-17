import { Tabs } from 'expo-router';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <Tabs
        screenOptions={{
            tabBarActiveTintColor: '#000',
            headerStyle: {
                backgroundColor: '#fff',
            },
            headerShadowVisible: false,
            headerTintColor: '#000',
            tabBarStyle: {
                backgroundColor: '#fff',
            },
        }}
    >

        <Tabs.Screen 
            name="index" 
            options={{ 
                headerShown: false,
                tabBarIcon: ({ color, focused}) => (
                    <Ionicons name={focused ? 'list-circle' : 'list-circle-outline' } color={color} size={24} />
                ),
                tabBarLabel: "Announcements", 
            }} 
        />
        <Tabs.Screen 
            name="itinerary" 
            options={{ 
                headerShown: false,
                tabBarIcon: ({ color, focused}) => (
                    <Ionicons name={focused ? 'airplane' : 'airplane-outline' } color={color} size={24} />
                ),
                tabBarLabel: "Itinerary", 
            }} 
        />
    </Tabs>
  );
}
