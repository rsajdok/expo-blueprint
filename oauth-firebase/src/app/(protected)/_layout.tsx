
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

export default function ProtectedLayout() {
    console.log("ProtectedLayout");

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Redirect href="/sign-in" />
    }

    // If the user is authenticated, render the protected content

    return (
        <QueryClientProvider client={queryClient}>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{ headerShown: true, title: "Protected" }}
                />
                <Stack.Screen
                    name="posts"
                    options={{ headerShown: true, title: "Posts" }}
                />
            </Stack>
        </QueryClientProvider>

    )
}