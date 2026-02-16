import React from "react";
import { Image, View, ViewStyle, ImageStyle, TouchableOpacity } from "react-native";
import { getIconSource } from "./icon-list";

type Props = {
    systemName: string;
    className?: string;
    cursor?: string;
    action?: () => void;
    width?: number;
    height?: number;
    onClick?: (e: any) => void;
    style?: ViewStyle;
};

export const Icon = (props: Props) => {
    const styles: ViewStyle = {};

    if (props.width) styles.width = props.width;
    if (props.height) styles.height = props.height;



    const iconComponent = (
        <Image
            source={getIconSource(props.systemName)}
            style={[{ ...styles, ...props.style } as ImageStyle]}
            resizeMode="contain"
        />
    );

    if (props.onClick || props.action) {
        return (
            <TouchableOpacity
                onPress={props.onClick || props.action}
                style={styles as ViewStyle}
            >
                {iconComponent}
            </TouchableOpacity>
        );
    }

    return (
        <View style={[styles, props.style]}>
            {iconComponent}
        </View>
    );
};