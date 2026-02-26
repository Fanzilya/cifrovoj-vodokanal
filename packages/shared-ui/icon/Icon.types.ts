import type { ComponentProps } from 'react';
import type {
    Ionicons,
    MaterialIcons,
    Feather,
} from '@expo/vector-icons';

export type IconLibraries = {
    ion: typeof Ionicons;
    material: typeof MaterialIcons;
    feather: typeof Feather;
};

export type IconType = keyof IconLibraries;

export type IconName<T extends IconType> =
    ComponentProps<IconLibraries[T]>['name'];

export interface IconProps<T extends IconType = 'ion'> {
    type?: T;
    systemName: IconName<T>;
    size?: number;
    color?: string;
}