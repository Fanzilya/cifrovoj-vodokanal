import type { ViewStyle, TextStyle } from "react-native";

// constants/inputStyles.ts
export const inputResetStyles: TextStyle = {
    margin: 0,
    backgroundColor: "transparent",
    textAlign: "left",
    includeFontPadding: false,
};

export const inputBorderFocused: string = "border-custom-accent !border-2";
export const inputBorderError: string = "border-red-500";
export const inputBorderDefault: string = "border-gray-300";
export const inputDisabledBg: string = "bg-gray-200";

export function getBorderColor(isFocused: boolean, isError: boolean): string {
    if (isFocused) {
        return inputBorderFocused;
    } else if (isError) {
        return inputBorderError;
    }
    return inputBorderDefault;
}

const commonStyles = "text-base text-black rounded-lg border-2 rounded-lg bg-white";
export const inputNotIconBaseClasses: string = (`py-2 px-2 ${commonStyles}`);
export const passwordContainerStyle: string = (`flex-row items-center pr-2 ${commonStyles}`);

export const passwordStyle: string = "py-2.5 px-2 ml-1 w-full";

export const placeholderTextColor: string = "#9ca3af";
export const iconColor: string = "#6b7280";

export function getContainerClasses(isFocused: boolean, isError: boolean = false, classContainer?: string): string {
    return (`${inputNotIconBaseClasses} ${getBorderColor(isFocused, isError)} ${classContainer}`)
}

export function getPasswordContainerClasses(isFocused: boolean, isError: boolean = false, classContainer?: string): string {
    return (`${passwordContainerStyle} ${getBorderColor(isFocused, isError)} ${classContainer}`)
}