import { Ionicons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import type { PasswordInputType } from "./setting/input-types";
import { getPasswordContainerClasses, passwordStyle } from "./styles/input-style";

export const Password: FC<PasswordInputType> = memo((props) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (text: string) => {
        props.onChange?.(text);
    };

    const handleFocus = () => {
        setIsFocused(true);
        props.onFocus?.();
    }

    const handleBlur = () => {
        setIsFocused(false)
    }

    return (
        <View className={getPasswordContainerClasses(isFocused, props.isError, props.classNames?.container)}>
            <TextInput
                value={props.value ?? ""}
                placeholder={props.placeholder}
                onChangeText={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                editable={!props.disabled}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
                className={passwordStyle}
            />
            <TouchableOpacity
                onPress={() => setShowPassword((v) => !v)}
                disabled={props.disabled}
                className={`${props.classNames?.icon}`}
                accessibilityLabel={showPassword ? "Скрыть пароль" : "Показать пароль"}
            >
                <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={22}
                    color="#6b7280"
                />
            </TouchableOpacity>
        </View>
    );
});

Password.displayName = "Password";
