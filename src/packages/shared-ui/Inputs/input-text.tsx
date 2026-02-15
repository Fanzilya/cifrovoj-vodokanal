import { InputTextType } from "./setting/input-types";
import { useState } from "react";
import { View, TextInput, TextInputProps, StyleSheet, StyleProp, ViewStyle } from "react-native";
import MaskInput from "react-native-mask-input";
import { phoneMask } from "./setting/input-mask";

// Переопределяем типы для React Native
export const Input = (props: InputTextType) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (rawValue: string) => {
        // Ограничиваем по maxLength
        if (props.lengthOptions?.maxLength && rawValue.length > props.lengthOptions.maxLength) {
            return;
        }

        // Для типа "number" фильтруем только цифры
        let formattedValue = rawValue;
        if (props.type === "number") {
            const numericValue = rawValue.replace(/[^0-9]/g, "");
            formattedValue = numericValue;
            if (props.maxValue !== undefined && Number(numericValue) > props.maxValue) return;
            if (props.minValue !== undefined && Number(numericValue) < props.minValue) return;
        }

        props.onChange?.(formattedValue);
    };

    const handleFocus = () => {
        setIsFocused(true);
        props.onFocus?.(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
        props.onFocus?.(false);
    };

    // Цвет границы
    const borderColor = isFocused
        ? "var(--clr-accent)" // или '#007AFF' (синий цвет RN)
        : props.isError
            ? "var(--clr-error)" // или '#ff3b30'
            : "var(--clr-border-gray)"; // или '#d1d1d6'

    // Объединяем стили
    const containerStyle: StyleProp<ViewStyle> = [
        styles.container,
        {
            borderColor,
            backgroundColor: props.disabled ? "#e5e5ea" : "transparent", // серый фон при disabled
        },
        props.style,
    ];

    // Рендерим нужный компонент в зависимости от типа
    const renderInput = () => {
        if (props.type === "phone") {
            return (
                <MaskInput
                    value={props.value?.toString() || ""}
                    mask={phoneMask}
                    onChangeText={handleChange}
                    placeholder={props.placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    editable={!props.disabled && !props.readonly}
                    keyboardType="phone-pad"
                    style={styles.nativeInput}
                />
            );
        }

        return (
            <TextInput
                value={props.value?.toString()}
                placeholder={props.placeholder}
                onChangeText={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                editable={!props.disabled && !props.readonly}
                keyboardType={
                    props.type === "number" ? "numeric" :
                        props.type === "email" ? "email-address" : "default"
                }
                secureTextEntry={props.type === "password"}
                maxLength={props.lengthOptions?.maxLength}
                style={styles.nativeInput}
            />
        );
    };

    return (
        <View style={containerStyle}>
            {renderInput()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderWidth: 1.5,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        outlineWidth: 0,
    },
    nativeInput: {
        fontSize: 16,
        color: "#000",
    },
});
