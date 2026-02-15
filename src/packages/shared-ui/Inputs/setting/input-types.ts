import { HTMLInputTypeAttribute } from "react";

export type InputContainerType = {
    classNames?: {
        wrapper?: string;
        header?: string;
        children?: string;
        underlineText?: string;
        valid?: string;
        icon?: string;
    };
    headerText?: string;
    isRequired?: boolean;
    measure?: string;
    iconName?: string;
    validText?: string;
    underlineText?: string;
    children: React.ReactNode;
};

export type InputTextType = {
    value: number | string | undefined;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    className?: string; // игнорируется, но оставлен для совместимости
    disabled?: boolean;
    style?: object; // React.CSSProperties → object (подходит для RN)
    isError?: boolean;
    minValue?: number;
    maxValue?: number;
    lengthOptions?: { minLength?: number; maxLength?: number };

    onChange?: (value: string) => void;
    onFocus?: (focused: boolean) => void;
    readonly?: boolean;
};


export type SearchType = {
    value: number | string;
    placeholder: string;
    disabled?: boolean;
    style?: React.CSSProperties;
    isError?: boolean;
    minValue?: number;
    maxValue?: number;
    icon?: string;

    lengthOptions?: {
        maxLength: number
    };

    classNames: {
        container?: string;
        input?: string;
        icon?: string;
    };

    onChange: (value: string) => void;
};

export type PasswordInputType = {
    value?: string;
    placeholder?: string;
    /** Веб: Tailwind-классы. RN: не используется, стили через style */
    classNames?: {
        container?: string;
        input?: string;
        icon?: string;
    };
    disabled?: boolean;
    isError?: boolean;
    style?: React.CSSProperties;

    // autoComplete?: string;
    // toggleButtonAriaLabel?: string;

    onChange?: (value: string) => void;

    onFocus?: () => void;
    // onBlur?: () => void;
    // validationCallback?: (value: string) => ValidationResult;
};

export type ValidationResult = {
    success: boolean;
    message?: string | null;
};


export interface ValidationEvent<T> extends React.ChangeEvent<T> {
    valid?: boolean;
}