
import { AuthProvider } from '@/providers/AuthProvider';
import '../../global.css';
import { Slot } from "expo-router";

export default function AppLayout() {
    console.log("AppLayout");
    return (
        <AuthProvider>
            <Slot />
        </AuthProvider >
    )
}