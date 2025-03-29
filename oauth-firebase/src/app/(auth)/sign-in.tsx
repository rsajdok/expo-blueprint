import { useAuth } from "@/providers/AuthProvider";
import { View, Text, Button } from "react-native";

export default function SignIn() {
    const { signIn } = useAuth();

    const onSignIn = () => {
        signIn();
    }

    return (
        <View className="flex-1 justify-center items-center">
            <Text className='text-2xl'>Sign In</Text>
            <Button title="Sign In" onPress={onSignIn} />
        </View>
    )
}