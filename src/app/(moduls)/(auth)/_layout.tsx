// src/app/(moduls)/(auth)/_layout.tsx
import { Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Slot, Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AuthLayout() {
    return (
        <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {/* Фоновый градиент с эффектами */}
            <LinearGradient
                colors={['#4A85F6', '#3a6bc9', '#2a52a0']}
                style={StyleSheet.absoluteFill}
            >
                <View className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-lg"></View>
                <View className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-xl"></View>
                <View className="absolute top-1/3 left-20 w-20 h-20 bg-white/15 rounded-full blur-md"></View>
                <View className="absolute bottom-1/3 right-32 w-16 h-16 bg-white/20 rounded-full blur"></View>
            </LinearGradient>

            {/* Контент дочернего экрана (например, LoginView) */}
            <Slot />

            {/* Футер */}
            <View className="bg-white/10 backdrop-blur border-t border-white/20 p-3">
                <View className="flex-col items-center space-y-2">
                    <Text className="text-white/80 text-xs text-center">
                        ©{' '}
                        <Text
                            className="underline"
                            onPress={() => Linking.openURL('https://elseti-rt.ru/')}
                        >
                            ГУП РТ «Электрические сети»
                        </Text>
                    </Text>
                    <Text className="text-white/80 text-xs text-center">
                        Разработано:{' '}
                        <Text
                            className="underline"
                            onPress={() => Linking.openURL('https://smkhydrig.ru/')}
                        >
                            ООО "СМК-ГИДРИКС"
                        </Text>
                    </Text>
                    <Text className="text-white/80 text-xs text-center">
                        <Text
                            className="underline"
                            onPress={() => Linking.openURL('/privacy-policy')}
                        >
                            Политика обработки персональных данных
                        </Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}
