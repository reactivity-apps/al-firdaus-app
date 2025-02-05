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
                title: 'Announcements',
                tabBarIcon: ({ color, focused}) => (
                    <Ionicons name={focused ? 'list-circle' : 'list-circle-outline' } color={color} size={24} />
                )
            }} 
        />
        <Tabs.Screen 
            name="itinerary" 
            options={{ 
                title: 'Itinerary',
                tabBarIcon: ({ color, focused}) => (
                    <Ionicons name={focused ? 'airplane' : 'airplane-outline' } color={color} size={24} />
                )
            }} 
        />
    </Tabs>
  );
}
