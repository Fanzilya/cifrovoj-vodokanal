import { Icon } from '@/packages/shared-ui/icon';
import { Link, Stack } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { Text, TouchableOpacity, View } from 'react-native';

const RegistryObjectsLayout = observer(() => {
  return (
    <View className="flex-1">
      <View className="flex-row items-center gap-4 px-4 pb-4 pt-8">
        <Link href="/menu-moduls">
          <TouchableOpacity>
            <Icon systemName="home-active" width={20} />
          </TouchableOpacity>
        </Link>
        <View>
          <Text className="text-gray-800 text-xl font-bold">Единый реестр объектов</Text>
          <View className="w-24 h-0.5 bg-[#4A85F6] rounded-full mt-1" />
        </View>
      </View>

      <View className="flex-1">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="map" />
        </Stack>
      </View>
    </View>
  );
});

export default RegistryObjectsLayout