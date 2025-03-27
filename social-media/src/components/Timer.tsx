import { useEffect, useRef, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Timer() {
    const [time, setTime] = useState<number>(0);
    const [isActived, setIsActived] = useState<boolean>(false);
    const inputRef = useRef(null);



    useEffect(() => {
        console.log("Component mounted");

        let timerID: any;

        if (isActived) {
            timerID = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!isActived && time !== 0) {
            clearInterval(timerID);
        }

        return () => {
            console.log("Component unmounted");
            clearInterval(timerID);
        }
    }, [time, isActived]);

    return (
        <View>
            <Text className="px-4">Timer: {time}</Text>
            <Button
                title=
                {isActived ? 'Pause' : 'Start'}

                onPress={() => setIsActived(!isActived)}>

            </Button >
        </View>
    );
}