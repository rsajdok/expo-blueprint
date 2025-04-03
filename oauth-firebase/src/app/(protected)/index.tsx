import { useAuth } from "@/providers/AuthProvider";
import { View, Text, Button, Pressable } from "react-native";
import {
    GoogleSignin,
    isErrorWithCode,
    statusCodes,
    GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Link } from "expo-router";

export default function index() {
    const { signOut } = useAuth();

    const onSignOut = async () => {
        try {
            await GoogleSignin.signOut();
            await auth().signOut();
            signOut();
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    return (
        <View className="flex-1 justify-center items-center gap-y-8">
            <Pressable
                onPress={onSignOut}
                className="bg-gray-200 rounded-lg px-6 py-3"
            >
                <Text className="text-blue-500 text-lg">Sign Out</Text>
            </Pressable>
            <Link
                href="/posts"
                className="text-blue-500 text-lg bg-gray-200 rounded-lg px-6 py-3"
            >
                Posts
            </Link>
        </View>
    )
}