import "../../global.css"
import { Stack } from "expo-router"
import WeatherProvider from "../providers/WeatherProvider"
import TemplateProvider from "../providers/TemplateProvider"

export default function RootLayout() {
    return (
        <WeatherProvider>
            <TemplateProvider>
                <Stack>
                    <Stack.Screen
                        name="index" />
                    <Stack.Screen name="second" options={{ title: "Second Screen" }} />
                    <Stack.Screen name="third" options={{ title: "Third Screen" }} />
                </Stack>
            </TemplateProvider>
        </WeatherProvider>
    );
}