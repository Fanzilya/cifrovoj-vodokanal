// import { useEffect, useState } from "react";
// import { Pressable, Text, View } from "react-native";

// interface SwitchButtonProps {
//     classNames?: {
//         container?: string;
//         button?: string;
//         circle?: string;
//         label?: string;
//     },
//     label?: string;
//     disabled?: boolean,
//     onChange: (value: boolean) => void;
//     defaultValue?: boolean;
// }

// export const SwitchButton = ({
//     classNames,
//     label,
//     disabled = false,
//     onChange,
//     defaultValue = false
// }: SwitchButtonProps) => {
//     const [checked, setChecked] = useState(defaultValue);

//     useEffect(() => {
//         setChecked(defaultValue);
//     }, [defaultValue]);

//     const handleClick = () => {
//         if (!disabled) {
//             const newValue = !checked;
//             setChecked(newValue);
//             onChange(newValue);
//         }
//     };

//     return (
//         <Pressable
//             className={`flex-row items-center gap-1 ${disabled ? 'opacity-50' : ''} ${classNames?.container || ''}`}
//             onPress={handleClick}
//             disabled={disabled}
//         >
//             <View className={`w-12 h-6 justify-center w-[40px] rounded-[50px] bg-[#757575] p-[3px] ${checked ? 'bg-custom-accent' : 'bg-gray-300'} ${classNames?.button || ''}`}>
//                 <View className={`w-5 h-5 bg-white rounded-[50px] bg-white h-[18px] w-[18px] shadow-sm ${checked ? 'ml-auto' : 'mr-auto'} ${classNames?.circle || ''}`} />
//             </View>

//             {label && (
//                 <Text
//                     className={`ml-2 text-sm font-medium ${checked ? 'text-custom-accent' : 'text-gray-700'} ${classNames?.label || ''}`}
//                 >
//                     {label}
//                 </Text>
//             )}
//         </Pressable>
//     );
// };


import { useEffect, useState } from "react";
import { Pressable, Text, View, Animated } from "react-native";

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

export const SwitchButton = ({ classNames, label, disabled = false, onChange, defaultValue = false }: SwitchButtonProps) => {

    const [checked, setChecked] = useState(defaultValue);
    const [animatedValue] = useState(new Animated.Value(defaultValue ? 1 : 0));

    useEffect(() => {
        setChecked(defaultValue);
        Animated.timing(animatedValue, {
            toValue: defaultValue ? 1 : 0,
            duration: 300,
            useNativeDriver: false
        }).start();
    }, [defaultValue]);

    const handleClick = () => {
        if (!disabled) {
            const newValue = !checked;
            setChecked(newValue);
            onChange(newValue);

            Animated.timing(animatedValue, {
                toValue: newValue ? 1 : 0,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    };

    const circlePosition = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [2, 20]
    });

    return (
        <Pressable
            className={`flex-row items-center ${disabled ? 'opacity-50' : ''} ${classNames?.container || ''}`}
            onPress={handleClick}
            disabled={disabled}
        >
            <View
                className={`w-12 h-6 rounded-full px-[1px] justify-center ${checked ? 'bg-custom-accent' : 'bg-gray-300'} ${classNames?.button || ''}`}
            >
                <Animated.View className={`w-5 h-5 bg-white rounded-full shadow-sm ${classNames?.circle || ''}`}
                    style={{
                        marginLeft: circlePosition,
                    }}
                />
            </View>

            {label && (
                <Text
                    className={`ml-2 text-sm font-medium ${checked ? 'text-custom-accent' : 'text-gray-700'} ${classNames?.label || ''}`}
                >
                    {label}
                </Text>
            )}
        </Pressable>
    );
};