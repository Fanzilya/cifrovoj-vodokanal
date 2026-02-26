import { Colors } from '@/packages/design-tokens/colors';
import { useAuth } from '@/packages/entities/user/context';
import { Icon } from '@/packages/shared-ui/icon';
import { Image, Text, View } from 'react-native';

export const HeaderMobile = () => {

    const { user } = useAuth();

    return (
        <View className="rounded-bl-[30px] rounded-br-[30px] border-b border-l border-r border-gray-300 w-full bg-white py-4 px-8 sm:py-6 sm:px-6 md:px-10 items-center flex-row absolute top-0 left-0 z-10">
            <View className="flex-row items-center gap-2 sm:gap-3 md:gap-4 xl:gap-[22px] h-fit min-w-fit">
                <Image
                    source={require('./assets/logo.png')}
                    alt="Логотип"
                    className="!h-[35px] !w-[30px]"
                />
            </View>

            <View className="flex-1 items-center justify-end gap-3 sm:gap-4 md:gap-6 flex-row">

                {/* <Icon type='material' systemName="notifications-active" color={Colors.accent} /> */}
                <Icon type='material' systemName="notifications" />

                <View className="flex items-center flex-row gap-2 sm:gap-3">
                    <View className="h-8 w-px bg-[#C2C2C2]" />
                    <View className="
                        bg-custom-accent from-blue-400 to-blue-600 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white font-semibold text-sm shadow-sm
                        ">
                        <Text className="text-white font-semibold text-sm">
                            {user?.firstName?.charAt(0)?.toUpperCase() || 'U'}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};
