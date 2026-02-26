import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Icon } from "../icon";
import { SeletectItemInterface } from "./type";

type Props = {
    placeholder: string;
    items: SeletectItemInterface[];
    onSelect?: (item: SeletectItemInterface) => void;
    classWripper?: string;
    className?: string;
    titleClass?: string;
    defaultValue?: string;
};

export const Selector = observer(
    ({
        placeholder,
        items,
        onSelect,
        classWripper,
        className,
        titleClass,
        defaultValue,
    }: Props) => {
        const [isOpen, setOpen] = useState(false);
        const [value, setValue] = useState<string | null>(null);

        useEffect(() => {
            if (defaultValue) {
                setValue(defaultValue);
            }
        }, [defaultValue]);

        const onChange = (selectedItem: SeletectItemInterface) => {
            setValue(selectedItem.title);
            setOpen(false);
            onSelect?.(selectedItem);
        };

        const handleToggle = () => {
            setOpen((prev) => !prev);
        };

        return (
            <View className={`relative ${classWripper}`}>
                {/* Trigger */}
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={handleToggle}
                    className={`flex-row bg-white items-center justify-between border p-3 rounded-lg ${titleClass}`}
                >
                    <Text
                        numberOfLines={1}
                        className={`flex-1 ${value ? "text-black" : "text-gray-400"
                            }`}
                    >
                        {value ?? placeholder}
                    </Text>

                    <Icon
                        systemName="keyboard-arrow-down"
                        type="material"
                        className={isOpen ? "rotate-180" : ""}
                    />
                </TouchableOpacity>

                {/* Dropdown */}
                {isOpen && (
                    <View
                        className={`absolute left-0 top-[110%] w-full bg-white rounded-lg border border-gray-200 shadow-md z-50 ${className}`}
                    >
                        {items.length === 0 ? (
                            <Text className="text-sm text-gray-500 p-4">
                                Список пустой
                            </Text>
                        ) : (
                            <ScrollView
                                className="max-h-40"
                                showsVerticalScrollIndicator={false}
                            >
                                {items.map((item, key) => (
                                    <TouchableOpacity
                                        key={key}
                                        onPress={() => onChange(item)}
                                        className="px-3 py-3 border-b border-gray-100"
                                    >
                                        <Text className="text-gray-900">
                                            {item.title}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                )}
            </View>
        );
    }
);