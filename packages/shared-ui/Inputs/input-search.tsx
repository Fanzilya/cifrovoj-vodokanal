import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { Icon } from "../icon";
import { SearchType } from "./setting/input-types";

export const Search = (props: SearchType) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (newValue: string) => {
        if (props.lengthOptions && newValue.length > props.lengthOptions.maxLength) return;
        props.onChange && props.onChange(newValue);
    };

    return (
        <View
            className={`items-center gap-1 w-full pr-3 flex-row gap-1 bg-white rounded-lg ${props.classNames.container}`}
            style={[
                {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    elevation: isFocused ? 3 : 0,
                },
                props.style,
            ]}
        >
            <TextInput
                className={`flex-1 pl-4 pr-1 py-3 text-[14px] ${props.classNames.input} ${props.disabled ? "bg-zinc-200" : ""
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
                <Icon systemName={props.icon ? props.icon : "search-gray-dark"} height={25} />
            </Pressable>
        </View>
    );
};