import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

interface SwitchButtonProps {
    classNames?: {
        container?: string;
        button?: string;
        circle?: string;
        label?: string;
    },
    label?: string;
    disabled?: boolean,
    onChange: (value: boolean) => void;
    defaultValue?: boolean;
}

export const SwitchButton = ({
    classNames,
    label,
    disabled = false,
    onChange,
    defaultValue = false
}: SwitchButtonProps) => {
    const [checked, setChecked] = useState(defaultValue);

    useEffect(() => {
        setChecked(defaultValue);
    }, [defaultValue]);

    const handleClick = () => {
        if (!disabled) {
            const newValue = !checked;
            setChecked(newValue);
            onChange(newValue);
        }
    };

    return (
        <Pressable
            className={`flex-row items-center ${disabled ? 'opacity-50' : ''} ${classNames?.container}`}
            onPress={handleClick}
            disabled={disabled}
        >
            <View
                className={`w-12 h-6 rounded-full transition-colors duration-300 justify-center ${classNames?.button}`}
                style={{
                    backgroundColor: checked ? "var(--clr-accent)" : "var(--clr-border-gray)",
                }}
            >
                <View
                    className={`w-5 h-5 rounded-full bg-white shadow-sm ${classNames?.circle}`}
                    style={{
                        marginLeft: checked ? 24 : 2,
                    }}
                />
            </View>

            {label && (
                <Text
                    className={`ml-2 text-sm font-medium transition-colors duration-300 ${classNames?.label}`}
                    style={{
                        color: checked ? "var(--clr-accent, #3b82f6)" : "var(--clr-text, #374151)",
                    }}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
};