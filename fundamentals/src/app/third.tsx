import { View, Text } from "react-native";
import { useWeatherContext } from "../providers/WeatherProvider";

export default function ThirdScreen() {
    const { temperature } = useWeatherContext();
    return (
        <View className="flex-1 items-center justify-center bg-white gap-6">
            <Text className="text-2xl">Third Screen</Text>
            <Text className="text-2xl">Temperature is {temperature}</Text>
        </View>
    );
}