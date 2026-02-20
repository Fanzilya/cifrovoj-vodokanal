import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { Icon } from "../icon";
import { SeletectItemInterface } from "./type";

type Props = {
    placeholder: string;
    items: SeletectItemInterface[];
    onSelect?: (item: SeletectItemInterface) => void;
    classWripper?: string;
    className?: string;
    titleClass?: string;
    icon?: string;
    defaultValue?: string;
};

export const Selector = observer(({
    placeholder,
    items,
    onSelect,
    classWripper,
    className,
    titleClass,
    icon,
    defaultValue,
}: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [value, setValue] = useState<string | null>('');
    const containerRef = useRef<View>(null);

    const onChange = (selectedValue: string) => {
        setValue(selectedValue);
        setOpen(false);
        const selectedItem = items.find(item => item.title === selectedValue);
        if (selectedItem && onSelect) {
            onSelect(selectedItem);
        }
    };

    const handleToggle = () => {
        setOpen(!isOpen);
    };

    return (
        <View ref={containerRef} className={`relative ${classWripper}`}>
            {/* Trigger */}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleToggle}
                className={`flex flex-row items-center justify-between border p-2 rounded-lg ${titleClass}`}
                style={{
                    borderColor: isOpen ? 'var(--clr-accent)' : 'var(--clr-border-gray)',
                }}
            >
                <Text numberOfLines={1} className="flex-1 truncate">
                    {value || defaultValue
                        ? (value || defaultValue)
                        : <Text className="text-gray-400">{placeholder}</Text>
                    }
                </Text>
                {icon && (
                    <Icon
                        systemName={icon}
                        className={`${isOpen ? 'rotate-180' : ''} transition-transform`}
                    />
                )}
            </TouchableOpacity>

            {/* Dropdown Modal */}
            <Modal visible={isOpen} transparent animationType="none">
                <Pressable className="flex-1" onPress={() => setOpen(false)}>
                    <View className={`absolute top-full left-0 w-full rounded-lg bg-white border ${className}`}>
                        {items.length === 0 ? (
                            <Text className="p-4 text-sm font-medium text-gray-500">Список пустой</Text>
                        ) : (
                            <View className="max-h-40">
                                {items.map((item) => (
                                    <TouchableOpacity
                                        key={item.value}
                                        onPress={() => onChange(item.title)}
                                        className="px-2 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-100"
                                    >
                                        <Text className="text-gray-900">{item.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
});
