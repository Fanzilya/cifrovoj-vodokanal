import { Button } from '@/packages/shared-ui/button/button';
import { Icon } from '@/packages/shared-ui/icon';
import { Selector } from '@/packages/shared-ui/Selector/selector';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

export const FilterObjects = observer(() => {
    const [open, setOpen] = useState(false);

    return (
        <View className="relative ml-4">
            {/* Trigger Button */}
            <TouchableOpacity
                onPress={() => setOpen((prev) => !prev)}
                className={`flex flex-row items-center gap-2 px-3 py-2 rounded-lg border ${open
                    ? 'bg-blue-50 border-blue-400'
                    : 'bg-white border-gray-300 h-11'
                    }`}
            >
                <Icon systemName={open ? 'filter-active' : 'filter'} />
                <Text className={`text-sm font-medium ${open ? 'text-blue-700' : 'text-gray-600'}`}>
                    Фильтр
                </Text>
                <Icon
                    systemName="arrow-down"
                    className={`${open ? 'rotate-180' : ''} transition-transform`}
                />
            </TouchableOpacity>

            <Modal visible={open} animationType="slide" presentationStyle="fullScreen">
                <View className="">
                    <Text className="text-sm font-semibold text-gray-800 mb-4">Параметры фильтра</Text>

                    <View className="mb-4">
                        <Text className="text-xs font-medium text-gray-500 mb-1">Район</Text>
                        <Selector
                            placeholder="Выберите район"
                            titleClass="border flex p-2 rounded-lg"
                            icon="arrow-down"
                            items={[]}
                        />
                    </View>

                    <View className="mb-5">
                        <Text className="text-xs font-medium text-gray-500 mb-1">Организация</Text>
                        <Selector
                            placeholder="Выберите организацию"
                            titleClass="border flex p-2 rounded-lg"
                            icon="arrow-down"
                            items={[]}
                        />
                    </View>

                    <View className="flex-row justify-between gap-2">
                        <Button
                            className="py-1 flex-1"
                            styleColor="blueOutline"
                        // onClick={() => {
                        // Reset logic
                        // }}
                        >
                            Сбросить
                        </Button>
                        <Button
                            className="py-1 flex-1"
                            styleColor="blue"
                        // onClick={() => setOpen(false)}
                        >
                            Применить
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
});
