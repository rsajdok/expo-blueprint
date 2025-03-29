import { signOut } from "@react-native-firebase/auth";
import { createContext, PropsWithChildren, useContext, useState } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    signIn: () => { },
    signOut: () => { },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const signIn = async () => {
        setIsAuthenticated(true);
    };

    const signOut = async () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>);
}

export const useAuth = () => useContext(AuthContext);