import { useState } from "react";
import { View, TextInput as RNTextInput } from "react-native";
import MaskInput, { type Mask } from "react-native-mask-input";
import { phoneMask } from "./setting/input-mask";
import { InputTextType } from "./setting/input-types";
import { getContainerClasses, inputResetStyles } from "./styles/input-style";

export const Input = (props: InputTextType) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (rawValue: string) => {
        if (props.lengthOptions?.maxLength && rawValue.length > props.lengthOptions.maxLength) {
            return;
        }

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


    const renderInput = () => {
        if (props.type === "phone") {
            return (
                <MaskInput
                    value={props.value?.toString() || ""}
                    mask={phoneMask as Mask}
                    onChangeText={handleChange}
                    placeholder={props.placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    editable={!props.disabled && !props.readonly}
                    keyboardType="phone-pad"
                    className={getContainerClasses(isFocused, props.isError, props.className)}
                    underlineColorAndroid="transparent"
                    style={inputResetStyles}
                />
            );
        }

        return (
            <RNTextInput
                value={props.value?.toString() ?? ""}
                placeholder={props.placeholder}
                onChangeText={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                editable={!props.disabled && !props.readonly}
                keyboardType={props.type === "number" ? "numeric" : props.type === "email" ? "email-address" : "default"}
                secureTextEntry={props.type === "password"}
                maxLength={props.lengthOptions?.maxLength}
                className={getContainerClasses(isFocused, false, props.className)}
                underlineColorAndroid="transparent"
                style={inputResetStyles}
            />
        );
    };

    return <View>{renderInput()}</View>;
};
