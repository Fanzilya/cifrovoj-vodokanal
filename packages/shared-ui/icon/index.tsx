import React from 'react';
import {
    Ionicons,
    MaterialIcons,
    Feather,
} from '@expo/vector-icons';
import { IconProps, IconType } from './Icon.types';


const ICON_MAP = {
    ion: Ionicons,
    material: MaterialIcons,
    feather: Feather,
};

export function Icon<T extends IconType = 'ion'>({
    type = 'ion' as T,
    systemName,
    size = 24,
    color = '#000',
    className
}: IconProps<T>) {
    const Component = ICON_MAP[type];

    return (
        <Component
            name={systemName as any}
            size={size}
            color={color}
            className={className}
        />
    );
}