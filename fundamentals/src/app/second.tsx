import { View, Text, Button } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useWeatherContext } from "../providers/WeatherProvider";

export default function SecondScreen() {
    const params = useLocalSearchParams<{ name?: string }>();
    const { setTemperatue, fetchTemperatue } = useWeatherContext();

    return (
        <View className="flex-1 items-center justify-center bg-white gap-6">
            <Text className="text-2xl">Second Screen</Text>
            <Text className="text-lg">Name: {params.name}</Text>
            <Button title="Set temperature to 10" onPress={() => setTemperatue?.(10)} />
            <Button title="Fetch temperature" onPress={() => fetchTemperatue!()} />
            <Link href="/third" push asChild>
                <Button title="Third Screen" />
            </Link>
        </View>
    );
}