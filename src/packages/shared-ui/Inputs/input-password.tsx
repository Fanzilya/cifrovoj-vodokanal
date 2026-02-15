import { Ionicons } from "@expo/vector-icons";
import type { FC } from "react";
import { memo, useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import type { PasswordInputType } from "./setting/input-types";

const BORDER_ACCENT = "#4A85F6";
const BORDER_ERROR = "#CB0D0D";
const BORDER_DEFAULT = "#d1d5db";

export const Password: FC<PasswordInputType> = memo((props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = isFocused
    ? BORDER_ACCENT
    : props.isError
      ? BORDER_ERROR
      : BORDER_DEFAULT;

  const handleChange = (text: string) => {
    props.onChange?.(text);
  };

  const containerStyle: StyleProp<ViewStyle> = [
    styles.container,
    { borderColor, backgroundColor: props.disabled ? "#e5e5ea" : "transparent" },
    props.style,
  ];

  return (
    <View style={containerStyle}>
      <TextInput
        value={props.value ?? ""}
        placeholder={props.placeholder}
        placeholderTextColor="#9ca3af"
        onChangeText={handleChange}
        onFocus={() => {
          setIsFocused(true);
          props.onFocus?.();
        }}
        onBlur={() => setIsFocused(false)}
        editable={!props.disabled}
        secureTextEntry={!showPassword}
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={() => setShowPassword((v) => !v)}
        disabled={props.disabled}
        style={styles.iconButton}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderWidth: 1.5,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    paddingVertical: 0,
  },
  iconButton: {
    padding: 4,
    marginLeft: 4,
  },
});
