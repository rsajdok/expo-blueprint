import { View, Text, Button } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { useWeatherContext } from "../providers/WeatherProvider";
import { useTemplateContext } from "../providers/TemplateProvider";

export default function SecondScreen() {
    const params = useLocalSearchParams<{ name?: string }>();
    const { setTemperatureManually, setTemperature, fetchTemperatue } = useWeatherContext();
    const { setMessageHandler } = useTemplateContext();

    return (
        <View className="flex-1 items-center justify-center bg-white gap-6">
            <Text className="text-2xl">Second Screen</Text>
            <Text className="text-lg">Name: {params.name}</Text>
            <Button title="Set temperature to 10" onPress={() => setTemperatureManually!(10)} />
            <Button title="Set template to 8" onPress={() => setMessageHandler!("8")} />
            <Button title="Set temperature to 5" onPress={() => setTemperature!(5)} />
            <Button title="Fetch temperature" onPress={() => fetchTemperatue!()} />
            <Link href="/third" push asChild>
                <Button title="Third Screen" />
            </Link>
        </View>
    );
}