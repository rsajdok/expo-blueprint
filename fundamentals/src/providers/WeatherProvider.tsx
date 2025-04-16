import { createContext, PropsWithChildren, useContext, useState } from "react";

type WeatherContext = {
    day: Date,
    temperature?: number;
    setTemperatue?: (temperature: number) => void;
    fetchTemperatue?: () => Promise<void>;
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

    const fetchTemperatue = async () => {
        const url = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";
        const response = await fetch(url);
        const data = await response.json();
        console.log("fetchTemperatue", JSON.stringify(data.current, null, 2));
        setTemperature(data.current.temperature_2m);
    }

    return (
        <WeatherContext.Provider value={{
            day,
            temperature,
            setTemperatue,
            fetchTemperatue
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