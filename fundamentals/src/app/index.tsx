import { Link } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function IndexScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white gap-6">
            <Text className="text-2xl">Welcome to app!</Text>
            <Link href={{ pathname: "/second", params: { name: "Ris" } }} push asChild >
                <Button title="Second Screen" />
            </Link >
        </View >
    );
}