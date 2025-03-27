import { Slot, Redirect } from "expo-router";
import { useAuth } from '@/providers/AuthProvider';
import { ActivityIndicator } from 'react-native';

export default function ProtectedLayout() {

    const { session, isLoading } = useAuth();

    console.log('isLoading ProtectedLayout', isLoading);
    if (isLoading) {
        return <ActivityIndicator />;

        return <p>Loading...</p>;
    }

    if (!session) {
        return <Redirect href="/sign-in" />;
    }

    return <Slot />;

    return (
        <Slot />
    );
}

