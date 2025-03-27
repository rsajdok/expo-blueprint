import { ActivityIndicator } from 'react-native';
import { Redirect, Slot } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';

export default function AuthLayout() {
    const { session, isLoading } = useAuth();

    console.log('isLoading AuthLayout', isLoading);
    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (session) {
        return <Redirect href="/" />;
    }

    return <Slot />;
}