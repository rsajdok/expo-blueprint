
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

export default function ProtectedLayout() {
    console.log("ProtectedLayout");

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Redirect href="/sign-in" />
    }

    // If the user is authenticated, render the protected content

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: true, title: "Protected" }}
            />
        </Stack>
    )
}