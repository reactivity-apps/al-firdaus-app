import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { auth } from "@/firebase/clientApp";
import { onAuthStateChanged, User } from "firebase/auth";
import { Text } from "react-native";
import { headerStyle } from "@/common/style";
import Loading from "@/components/Loading";

export default function AdminLayout() {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);

    const router = useRouter();

    // Check if user is logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/?message=unauthorized-user");
        }
    }, [user, loading, router]);


    if(loading) return <Loading />;

    return (
        <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{
                title: "Admin",
                ...headerStyle
            }} />
            <Stack.Screen name="create-announcement" options={{
                title: "Create Announcements",
                ...headerStyle
            }} />
            <Stack.Screen name="manage-announcements" options={{
                title: "Manage Announcements",
                ...headerStyle
            }} />
        </Stack>
    );
}