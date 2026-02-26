import { Button } from '@/packages/shared-ui/button/button';
import { Icon } from '@/packages/shared-ui/icon';
import { Selector } from '@/packages/shared-ui/Selector/selector';
import { SwitchButton } from '@/packages/shared-ui/switch-button';
import { Ionicons } from '@expo/vector-icons';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

export const FilterObjects = observer(() => {
        const [open, setOpen] = useState(false);

    return (
        <View className='h-full'>
            <TouchableOpacity onPress={() => setOpen((prev) => !prev)}
                className={`flex-row items-center gap-2 px-3 py-2 rounded-lg border bg-white border-gray-300 h-11`}
            >
                <Icon systemName="filter" size={20} />
                {/* <Text className={`text-sm font-medium text-gray-600`}>Фильтр</Text> */}
            </TouchableOpacity>

            <Modal visible={open} animationType="slide" presentationStyle="fullScreen">
                <View className="p-4">
                    <Text className="text-sm font-semibold text-gray-800 mb-4">Параметры фильтра</Text>
                    <TouchableOpacity className="text-sm font-semibold text-gray-800 mb-4">
                        <Button onPress={() => setOpen(false)}>
                            <Ionicons
                                size={20}
                                className='text-white'
                                name="close"
                            />
                        </Button>
                    </TouchableOpacity>

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

                    <View className="gap-2 pt-4 border-t border-gray-200">
                        <View className='flex-row'>
                            <SwitchButton
                                label=""
                                onChange={() => { }}
                                classNames={{
                                    container: 'gap-1',
                                    button: 'w-[40px] rounded-[150px] bg-[#757575] p-[3px]',
                                    circle: 'rounded-[150px] bg-white h-[18px] w-[18px]',
                                }}
                            />
                            <Text className="text-sm text-gray-700">Диспетчерская</Text>
                        </View>

                        <View className='flex-row'>
                            <SwitchButton
                                label=""
                                onChange={() => { }}
                                classNames={{
                                    container: 'gap-1',
                                    button: 'w-[40px] rounded-[150px] bg-[#757575] p-[3px]',
                                    circle: 'rounded-[150px] bg-white h-[18px] w-[18px]',
                                }}
                            />
                            <Text className="text-sm text-gray-700">Управление ЖБО</Text>
                        </View>
                    </View>

                </View>
            </Modal>
        </View>
    );
});
