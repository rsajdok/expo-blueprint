import '../../global.css';
import { AuthProvider } from '@/providers/AuthProvider';
import { Slot } from "expo-router";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { useColorScheme } from 'react-native';
import { OfflineBanner } from '@/components/OfflineBanner';

export default function AppLayout() {
    console.log("AppLayout");
    const colorScheme = useColorScheme() || "light";

    console.log(colorScheme);
    return (
        <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
            <AuthProvider>
                <Slot />
            </AuthProvider >
            <OfflineBanner />
        </ThemeProvider>
    )
}