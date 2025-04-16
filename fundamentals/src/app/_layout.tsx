import "../../global.css"
import { Stack } from "expo-router"

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index" />
            <Stack.Screen name="second" options={{ title: "Second Screen" }} />
            <Stack.Screen name="third" options={{ title: "Third Screen" }} />
        </Stack>
    );
}