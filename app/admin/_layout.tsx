import React, { useEffect } from "react";
import { Stack, useRouter } from "expo-router";
import { headerStyles } from "@/styles/header";
import Loading from "@/components/Loading";
import { useUser } from "@/contexts/UserContext";

export default function AdminLayout() {
    const router = useRouter();
    const {user, status, loading} = useUser();

    useEffect(() => {
        if (!loading && (!user || status !== "admin")) {
            router.replace("/?message=unauthorized-user");
        }
    }, [user, loading, status, router]);


    if(loading) return <Loading />;

    return (
        <Stack initialRouteName="index">
            <Stack.Screen name="index" options={{
                title: "Admin",
                ...headerStyles
            }} />
            <Stack.Screen name="create-announcement" options={{
                title: "Create Announcements",
                ...headerStyles
            }} />
            <Stack.Screen name="manage-announcements" options={{
                title: "Manage Announcements",
                ...headerStyles
            }} />
            <Stack.Screen name="view-users" options={{
                title: "View Users",
                ...headerStyles
            }} />
        </Stack>
    );
}