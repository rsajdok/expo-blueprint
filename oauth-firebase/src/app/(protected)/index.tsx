

import { useAuth } from "@/providers/AuthProvider";
import { View, Text, Button } from "react-native";

export default function index() {
    const { signOut } = useAuth();

    const onSignOut = () => {
        signOut();
    }

    return (
        <View className="flex-1 justify-center items-center">
            <Text className='text-2xl'>Protected</Text>
            <Button title="Sign out" onPress={onSignOut} />
        </View>
    )
}