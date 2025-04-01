import { useAuth } from "@/providers/AuthProvider";
import { View, Text, Button } from "react-native";
import {
    GoogleSignin,
    isErrorWithCode,
    statusCodes,
    GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

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
        <View className="flex-1 justify-center items-center">
            <Button title="Sign out" onPress={onSignOut} />
        </View>
    )
}