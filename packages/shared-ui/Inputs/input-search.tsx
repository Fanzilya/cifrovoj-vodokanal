import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Icon } from "../icon";
import { SearchType } from "./setting/input-types";
import { Colors } from "@/packages/design-tokens/colors";

export const Search = (props: SearchType) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (newValue: string) => {
        if (props.lengthOptions && newValue.length > props.lengthOptions.maxLength) return;
        props.onChange && props.onChange(newValue);
    };

    return (
        <View className={`items-center gap-1 pr-3 flex-row gap-1 bg-white rounded-lg border border-gray-300 rounded-lg ${props.classNames.container}`}
            style={[
                props.style,
            ]}
        >
            <TextInput
                className={`flex-1 pl-4 pr-1 py-3 text-[14px] px-4 text-gray-800 text-sm ${props.classNames.input} ${props.disabled ? "bg-zinc-200" : ""
                    }`}
                placeholder={props.placeholder}
                editable={!props.disabled}
                maxLength={props.lengthOptions?.maxLength}
                value={props.value}
                onChangeText={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            <Pressable
                className={`${props.classNames.icon}`}
                disabled={props.disabled}
            >
                <Icon systemName="search" size={25} color={Colors.icon_gray} />
            </Pressable>
        </View>
    );
};