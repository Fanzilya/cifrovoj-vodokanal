import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { StyleColor } from "./config";

const ACCENT = "#4A85F6";
const ACCENT_DARK = "#3a6bc9";
const ACCENT_ACTIVE = "#2a52a0";

type Props = {
  children?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  styleColor?: StyleColor;
  /** Для совместимости с веб: передаётся в onPress */
  type?: "button" | "submit" | "reset";
};

const colorStyles: Record<StyleColor, { container: ViewStyle; text: { color: string } }> = {
  blue: { container: { backgroundColor: ACCENT }, text: { color: "#fff" } },
  blueOutline: {
    container: { backgroundColor: "transparent", borderWidth: 1, borderColor: ACCENT },
    text: { color: ACCENT },
  },
  gray: { container: { backgroundColor: "#f3f4f6" }, text: { color: "#374151" } },
  red: { container: { backgroundColor: "#dc2626" }, text: { color: "#fff" } },
  green: { container: { backgroundColor: "#16a34a" }, text: { color: "#fff" } },
  greenOutline: {
    container: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#22c55e" },
    text: { color: "#22c55e" },
  },
  redOutline: {
    container: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#ef4444" },
    text: { color: "#ef4444" },
  },
  grayOutline: {
    container: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#6b7280" },
    text: { color: "#6b7280" },
  },
  yellow: { container: { backgroundColor: "#fde047" }, text: { color: "#854d0e" } },
};

export const Button: React.FC<Props> = (props) => {
  const {
    children,
    onPress,
    disabled = false,
    style,
    styleColor = "blue",
    type = "button",
  } = props;

  const colorSet = colorStyles[styleColor] ?? colorStyles.blue;

  const handlePress = () => {
    if (disabled) return;
    onPress?.();
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.base,
        colorSet.container,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
    >
      {typeof children === "string" ? (
        <Text style={[styles.text, colorSet.text, disabled && styles.textDisabled]}>{children}</Text>
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    minHeight: 44,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  textDisabled: {
    color: "#9ca3af",
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.9,
  },
});
