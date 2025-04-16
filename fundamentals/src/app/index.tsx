import { Link } from 'expo-router';
import { Button, Pressable, Text, View } from 'react-native';
import { useWeatherContext } from '../providers/WeatherProvider';
import { AppButton } from '../components/AppButton';

export default function IndexScreen() {
    const { day } = useWeatherContext();
    return (
        <View className="flex-1 items-center justify-center bg-white gap-6">
            <Text className="text-2xl">Welcome to app!</Text>
            <Text className="text-lg">Today is {day.toLocaleDateString()}</Text>
            <Link href={{ pathname: "/second", params: { name: "Ris" } }} push asChild >
                {/*<Button title="Second Screen" />*/}
                <AppButton title="Second Screen" />
            </Link >
        </View >
    );
}