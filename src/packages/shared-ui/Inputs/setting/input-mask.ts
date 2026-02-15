/** Строковый шаблон для отображения */
export const phoneMaskDisplay = "+7 (999) 999-99-99";

/** Маска для react-native-mask-input (формат MaskArray) */
export const phoneMask: Array<string | RegExp> = [
    "+",
    "7",
    " ",
    "(",
    /\d/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
];
