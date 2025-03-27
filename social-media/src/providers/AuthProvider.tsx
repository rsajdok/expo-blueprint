import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { User } from '@/types/models';
import * as SecureStore from 'expo-secure-store';
import { signInRequest } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";

type Session = {
    user: User;
    accessToken: string;
};

const AuthContext = createContext<{
    signIn: (handle: string) => void;
    signOut: () => void;
    session?: Session | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

export function AuthProvider({ children }: PropsWithChildren) {
    const [session, setSession] = useState<Session | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadSession();
    }, []);

    /*
    const signIn = (handle: string) => {
        setIsLoading(true);
        setTimeout(() => {
            const session: Session = {
                user: {
                    id: "1",
                    handle,
                    name: "John Doe",
                    avatar: "https://"
                },
                accessToken: "accessToken"
            };

            setSession(session);
            saveSession(session);
            setIsLoading(false);
        }, 3000);
    };
    */

    const signOut = () => {
        setIsLoading(true);
        setTimeout(() => {
            setSession(null);
            saveSession(null);
            setIsLoading(false);
        }, 3000);
    };

    const { mutate: signIn } = useMutation({
        mutationFn: (handle: string) => signInRequest(handle),
        onSuccess: (data) => {
            setSession(data);
            saveSession(data);
        },
        onError: (error) => {
            Alert.alert('Error', 'Failed to sign in');
        },
    },);

    // Persist session in secure storage
    const saveSession = async (value: Session | null) => {
        if (value) {
            await SecureStore.setItemAsync("session", JSON.stringify(value));
        } else {
            await SecureStore.deleteItemAsync("session");
        }
    };

    const loadSession = async () => {
        const session = await SecureStore.getItemAsync("session");
        setSession(session ? JSON.parse(session) : null);
        setIsLoading(false);
    };


    return (
        <AuthContext.Provider value={{ signIn, signOut, session, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);