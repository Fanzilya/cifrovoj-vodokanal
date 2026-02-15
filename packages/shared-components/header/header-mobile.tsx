import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export const HeaderMobile = () => {
    return (
        <View className="text-red flex relative max-w-full bg-white py-4 px-4 sm:py-6 sm:px-6 md:px-10 items-center border-b border-gray-300 shadow-sm flex-row">
            <View className="flex-row items-center gap-2 sm:gap-3 md:gap-4 xl:gap-[22px] h-fit min-w-fit">
                <Text className="text-red font-bold text-xs sm:text-sm md:text-base xl:text-[20px] max-w-[80px] sm:max-w-[120px] md:max-w-[150px] lg:max-w-none truncate">
                    ИАС “Цифровой Водоканал”
                </Text>
            </View>

            <View className="flex-1 flex-row items-center justify-end gap-3 sm:gap-4 md:gap-6">
                <Link href="/domain/registry-objects" className="text-sm md:text-base text-blue-600">
                    <Text className="text-sm md:text-base text-blue-600">Список объектов</Text>
                </Link>
                <Link href="/domain/registry-map" className="text-sm md:text-base text-blue-600">
                    <Text className="text-sm md:text-base text-blue-600">Карта объектов</Text>
                </Link>
            </View>
        </View>
    );
};