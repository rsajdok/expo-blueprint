import { View, Text, Button } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";

export default function SecondScreen() {
    const params = useLocalSearchParams<{ name?: string }>();

    return (
        <View className="flex-1 items-center justify-center bg-white gap-4">
            <Text className="text-2xl">Second Screen</Text>
            <Text className="text-lg">Name: {params.name}</Text>
            <Link href="/third" push asChild>
                <Button title="Third Screen" />
            </Link>
        </View>
    );
}