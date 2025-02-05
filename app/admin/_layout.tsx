import { Stack } from "expo-router";

export default function AdminLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Admin" }} />
            <Stack.Screen name="login" options={{ title: "Admin Login" }} />
        </Stack>
    );
}