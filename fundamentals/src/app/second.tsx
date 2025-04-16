import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function SecondScreen() {
    return (
        <View className="flex-1 items-center justify-center bg-white p-4">
            <Text className="text-2xl">Second Screen</Text>
            <Link href="/third" push asChild>
                <Button title="Third Screen" />
            </Link>
        </View>
    );
}