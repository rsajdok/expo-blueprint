import "../../global.css"
import { Stack } from "expo-router"
import WeatherProvider from "../providers/WeatherProvider"

export default function RootLayout() {
    return (
        <WeatherProvider>
            <Stack>
                <Stack.Screen
                    name="index" />
                <Stack.Screen name="second" options={{ title: "Second Screen" }} />
                <Stack.Screen name="third" options={{ title: "Third Screen" }} />
            </Stack>
        </WeatherProvider>
    );
}