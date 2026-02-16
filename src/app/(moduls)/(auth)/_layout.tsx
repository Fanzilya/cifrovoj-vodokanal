import { LinearGradient } from 'expo-linear-gradient';
import { Slot } from 'expo-router';
import { Image, Linking, ScrollView, StyleSheet, Text, View } from 'react-native';
const logo = require("@/src/assets/images/logo.png")

export default function AuthLayout() {
    return (
        <ScrollView className='flex-1' keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <LinearGradient className='flex-1' colors={['#4A85F6', '#3a6bc9', '#2a52a0']}>
                <View style={StyleSheet.absoluteFill}>
                    <View className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-lg"></View>
                    <View className="absolute bottom-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-xl"></View>
                    <View className="absolute top-1/3 left-20 w-20 h-20 bg-white/15 rounded-full blur-md"></View>
                    <View className="absolute bottom-1/3 right-32 w-16 h-16 bg-white/20 rounded-full blur"></View>
                </View>

                <View className="flex-1 justify-center items-center p-4">
                    <View className="justify-center items-center bg-transparent mb-6">
                        <View className="items-center gap-3">
                            <View className="bg-white/20 backdrop-blur h-[50px] w-[50px] rounded-xl p-2 shadow-lg border border-white/30">
                                <Image
                                    source={logo}
                                    className="w-auto h-auto max-w-full max-h-full aspect-square"
                                    resizeMode="contain"
                                />
                            </View>

                            <Text className="font-bold text-white text-sm md:text-2xl text-center">
                                ИАС «ЦИФРОВОЙ ВОДОКАНАЛ»
                            </Text>
                        </View>
                    </View>

                    <Slot />

                    <Text className="text-white/95 text-sm text-center leading-relaxed mb-6 mt-6">
                        Комплексная интеллектуальная система управления, объединяющая в единый цифровой контур все процессы водоснабжения и водоотведения для обеспечения их надежности, управляемости и экономической эффективности.
                    </Text>

                    <View className="p-3 bg-white/10 backdrop-blur rounded-lg border border-white/20">
                        <Text className="text-white/90 text-xs text-center leading-tight">
                            Программное обеспечение зарегистрировано в Реестре российского ПО{' '}
                            <Text
                                className="font-bold underline"
                                onPress={() => Linking.openURL('https://reestr.digital.gov.ru/reestr/4154545/')}
                            >
                                №30603
                            </Text>{' '}
                            от 06.11.2025
                        </Text>
                        <Text className="text-white/80 text-xs mt-1 text-center">
                            <Text
                                className="underline"
                                onPress={() => Linking.openURL('https://reestr.digital.gov.ru/request/4048188/')}
                            >
                                Запись от 01.10.2025 №342655
                            </Text>
                        </Text>
                    </View>
                </View>

                <View className="bg-white/10 backdrop-blur border-t border-white/20 p-3 mt-6">
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
            </LinearGradient>
        </ScrollView>
    );
} 