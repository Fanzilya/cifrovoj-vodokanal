import { HeaderMobile } from '@/packages/shared-components/header/header-mobile';
import { LayoutNavitgate } from '@/src/widgets/domain/object-registry/layout-navigate';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DomainLayout() {

    const insets = useSafeAreaInsets();

    return (
        <View className='flex-1 bg-gray-100'>
            <HeaderMobile />
            <View style={{ paddingBottom: 60 + insets.bottom }} className='flex-1'>
                <Slot />
            </View>
            <LayoutNavitgate />
        </View>
    )
}