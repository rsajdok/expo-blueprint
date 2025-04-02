import { View, Text, useColorScheme, Touchable, TouchableOpacity } from "react-native";
import {
    GoogleSignin,
    isErrorWithCode,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import { useAuth } from "@/providers/AuthProvider";

GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID
});


export default function SignIn() {
    const [initializing, setInitializing] = useState(true);
    const { signIn } = useAuth();
    const colorScheme = useColorScheme();

    console.log(colorScheme);

    useEffect(() => {
        const unSubscriber = auth().onAuthStateChanged(user => {
            if (user) {
                console.log("user", user.email);
                signIn();
            }
        });

        // Unsubscribe on unmount
        return () => {
            unSubscriber();
            setInitializing(false);
        };
    }, [initializing]);

    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.signOut();

            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const response = await GoogleSignin.signIn();

            // Create a Google credential with the token
            if (response?.data !== null) {
                const googleCredential = auth.GoogleAuthProvider.credential(response.data?.idToken);

                // Sign-in the user with the credential
                return auth().signInWithCredential(googleCredential);
            }
        } catch (error) {
            console.log('Error during Google Sign-In', error);
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.IN_PROGRESS:
                        // operation (eg. sign in) already in progress
                        break;
                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        // Android only, play services not available or outdated
                        break;
                    default:
                    // some other error happened
                }
            } else {
                // an error that's not related to google sign in occurred
            }
        }
    }

    return (
        <View className="flex-1 justify-center items-center">
            <TouchableOpacity
                className={`p-4 rounded ${colorScheme === "dark" ? "bg-white" : "bg-red-500"}`}
                onPress={onGoogleButtonPress}
            >
                <Text className={`${colorScheme === "dark" ? "text-black" : "text-white"} text-center`}>Sign in</Text>
            </TouchableOpacity>
        </View>
    );
}