import React, { useEffect, useState } from "react";
import { Stack, Link } from "expo-router";
import { auth } from "@/firebase/clientApp";
import { onAuthStateChanged, User } from "firebase/auth";
import { Text } from "react-native";

export default function AdminLayout() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    // Check if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);


    if(loading) return <Text>Loading...</Text>;

    if(!user) {
        return (
            <Text style={{ flexDirection: "row" }}>
                You do not have access to this page! Please return 
                <Link href="/" style={{ color: "blue", textDecoration: "underline", marginHorizontal: 5 }}>home.</Link>
            </Text>
        );
    }

    return (
        <Stack initial="index">
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="create-announcement" options={{ headerShown: false }} />
            <Stack.Screen name="manage-announcements" options={{ headerShown: false }} />
        </Stack>
    );
}