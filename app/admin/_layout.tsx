import { Stack } from "expo-router";

export default function AdminLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="create-announcement" options={{ headerShown: false }} />
            <Stack.Screen name="manage-announcements" options={{ headerShown: false }} />
        </Stack>
    );
}