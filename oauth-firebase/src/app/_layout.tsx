
import '../../global.css';
import { View, Text } from "react-native";
import GoogleSignInButton from './components/GoogleSignInButton';

export default function AppLayout() {

    return (
        <View className="flex-1 items-center justify-center">
            <Text className="text-yellow-300 text-2xl">App Layout</Text>
            <GoogleSignInButton />
        </View>
    )
}