import { createContext, PropsWithChildren, useContext, useState } from "react";

type WeatherContext = {
    day: Date,
    temperature?: number;
    setTemperatue?: (temperature: number) => void;
}

const WeatherContext = createContext<WeatherContext>({
    day: new Date(),
});

export default function WeatherProvider({ children }: PropsWithChildren) {
    const [day] = useState(new Date());
    const [temperature, setTemperature] = useState<number | undefined>(undefined);

    const setTemperatue = (temperature: number) => {
        console.log("setTemperatue", temperature);
        setTemperature(temperature);
    }

    return (
        <WeatherContext.Provider value={{
            day,
            temperature,
            setTemperatue
        }}>
            {children}
        </WeatherContext.Provider>
    );
}

export const useWeatherContext = () => {
    if (!WeatherContext) {
        throw new Error("useWeatherContext must be used within a WeatherProvider");
    }
    return useContext(WeatherContext);
}