import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";

export default function AuthLayout() {
    console.log("AuthLayout");

    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Redirect href="/" />
    }

    return (
        <Stack>
            <Stack.Screen
                name="sign-in"
                options={{ headerShown: true, title: "Sign In" }}
            />
            {/*
            <Stack.Screen
                name="sign-up"
                options={{ headerShown: false, title: "Sign Up" }}
            />
            */}
        </Stack>
    )
}