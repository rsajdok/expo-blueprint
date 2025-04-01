import '../../global.css';
import { AuthProvider } from '@/providers/AuthProvider';
import { Slot } from "expo-router";
export default function AppLayout() {
    console.log("AppLayout");

    return (
        <AuthProvider>
            <Slot />
        </AuthProvider >
    )
}