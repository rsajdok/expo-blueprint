import { createContext, PropsWithChildren, useContext, useState } from "react";

type TemplateContextType = {
    message?: string;
    setMessageHandler?: (message: string) => void;
};

const TemplateContext = createContext<TemplateContextType>({});

export default function TemplateProvider({ children }: PropsWithChildren) {
    const [message, setMessage] = useState<string | undefined>(undefined);

    const setMessageHandler = (newMessage: string) => {
        setMessage(newMessage);
    };

    return (
        <TemplateContext.Provider value={{ setMessageHandler, message }}>
            {children}
        </TemplateContext.Provider>
    );
}

export const useTemplateContext = () => {
    if (!TemplateContext) {
        throw new Error("useTemplateContext must be used within a TemplateProvider");
    }
    return useContext(TemplateContext);
};