import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/auth';
import LoginForm from '@/components/LoginForm';

export default function App() {
    const { user, isLoading, signOut } = useAuth();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!user) {
        return <LoginForm />;
    }

    return (
        <View style={styles.container}>
            <Text>Logged as:</Text>
            <Text>{user.email}</Text>
            <Button title="Logout" onPress={signOut} />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
