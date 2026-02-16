import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Pressable, Text, View } from "react-native";
import { StyleColor } from "./config";

const ACCENT = "#4A85F6";
const ACCENT_DARK = "#3a6bc9";
const ACCENT_ACTIVE = "#2a52a0";

type Props = {
  children?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
  styleColor?: StyleColor;
  /** Для совместимости с веб: передаётся в onPress */
  type?: "button" | "submit" | "reset";
};

const colorClasses: Record<StyleColor, { container: string; text: string }> = {
  blue: {
    container: "bg-[#4A85F6] border-0",
    text: "text-white",
  },
  blueOutline: {
    container: "bg-transparent border border-[#4A85F6]",
    text: "text-[#4A85F6]",
  },
  gray: {
    container: "bg-gray-100 border-0",
    text: "text-gray-700",
  },
  red: {
    container: "bg-red-600 border-0",
    text: "text-white",
  },
  green: {
    container: "bg-green-600 border-0",
    text: "text-white",
  },
  greenOutline: {
    container: "bg-transparent border border-green-500",
    text: "text-green-500",
  },
  redOutline: {
    container: "bg-transparent border border-red-500",
    text: "text-red-500",
  },
  grayOutline: {
    container: "bg-transparent border border-gray-500",
    text: "text-gray-500",
  },
  yellow: {
    container: "bg-yellow-300 border-0",
    text: "text-amber-800",
  },
};

export const Button: React.FC<Props> = (props) => {
  const {
    children,
    onPress,
    disabled = false,
    style,
    className = "",
    styleColor = "blue",
    type = "button",
  } = props;

  const colors = colorClasses[styleColor] ?? colorClasses.blue;

  const handlePress = () => {
    if (disabled) return;
    onPress?.();
  };

  return (
    <Pressable
      className={
        `
          flex-row items-center justify-center px-4 py-2.5 rounded-lg min-h-11
          ${colors.container}
          ${disabled ? "opacity-60" : ""}
          ${className}
        `}
      disabled={disabled}
      onPress={handlePress}
      style={style}
      accessibilityRole="button"
    >
      {typeof children === "string" ? (
        <Text
          className={`text-base font-semibold ${colors.text} ${disabled ? "text-gray-400" : ""}`}
        >
          {children}
        </Text>
      ) : (
        <View className={"flex-row items-center justify-center"}>{children}</View>
      )}
    </Pressable>
  );
};
