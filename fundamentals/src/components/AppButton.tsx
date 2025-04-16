import React, { Children, ComponentProps, forwardRef } from "react";
import { Pressable, PressableProps, Text, View } from "react-native";

type AppButtonProps = PressableProps & {
    title: string;
    disabled?: boolean;
    onPress?: () => void;
} & ComponentProps<typeof Pressable>;

export const AppButton = forwardRef<React.ComponentRef<typeof Pressable>, AppButtonProps>(
    ({ title, disabled, onPress, ...pressableProps }, ref) => {
        return (
            <View className="bg-blue-500 rounded-lg px-4 py-2">
                <Pressable
                    ref={ref}
                    {...pressableProps}
                    disabled={disabled}
                    onPress={onPress}
                    className={`bg-blue-500 rounded-lg px-2 py-2 ${disabled ? "opacity-50" : "opacity-100"
                        }`}
                >
                    <Text className="text-lg text-white">{title}</Text>
                </Pressable>
            </View>
        );
    }
);
