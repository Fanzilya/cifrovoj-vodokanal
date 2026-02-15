import loginModel from "@/src/features/auth/login/login-model";
import { useAuth } from "@/src/packages/entities/user/context";
import { InputContainer } from "@/src/packages/shared-ui/Inputs/input-container";
import { Password } from "@/src/packages/shared-ui/Inputs/input-password";
import { Input } from "@/src/packages/shared-ui/Inputs/input-text";
import { Button } from "@/src/packages/shared-ui/button/button";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Linking,
    Modal,
    Platform,
    Pressable,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const logo = require("@/assets/images/logo.png")

interface RegistrationProps {
    show: boolean;
    onClose: () => void;
}

/** Заглушка экрана заявки на регистрацию */
const Registration: React.FC<RegistrationProps> = ({ show, onClose }) => (
    <Modal visible={show} transparent animationType="fade">
        {/* Полупрозрачный фон */}
        <Pressable className="flex-1 justify-center items-center bg-black/50 p-6" onPress={onClose}>
            {/* Модальное окно */}
            <Pressable
                className="w-full max-w-[320] bg-white rounded-2xl p-6 items-center"
                onPress={() => { }}
            >
                <Text className="text-lg font-bold text-gray-900 mb-2">Заявка на регистрацию</Text>
                <Text className="text-sm text-gray-500 mb-5">Функция в разработке</Text>
                <TouchableOpacity
                    className="bg-blue-600 px-6 py-3 rounded-lg active:bg-blue-700"
                    onPress={onClose}
                >
                    <Text className="text-white text-base font-semibold">Закрыть</Text>
                </TouchableOpacity>
            </Pressable>
        </Pressable>
    </Modal>
);

export const LoginScreen = observer(() => {
    const [isRegister, setIsRegister] = useState(false);
    const { setUser, initCompany, initTriecoCompany } = useAuth();
    const { model, validError, isLoading, canSubmit, isErrorStart, login } = loginModel;

    const handleSubmit = useCallback(() => {
        login(setUser, initCompany, initTriecoCompany);
    }, [login, setUser, initCompany, initTriecoCompany]);

    return (
        <>
            <Registration show={isRegister} onClose={() => setIsRegister(false)} />
            <View className="flex-1 justify-center items-center">
                <View className="flex-1 justify-center items-center bg-transparent">
                    <View className="items-center space-y-3">

                        <View className="bg-white/20 backdrop-blur rounded-xl p-3 shadow-lg border border-white/30">
                            <Image source={logo} className="h-4 w-4" resizeMode="contain" />
                        </View>

                        <Text className="font-bold text-white text-sm md:text-2xl text-center">
                            ИАС «ЦИФРОВОЙ ВОДОКАНАЛ»
                        </Text>

                        <Text className="text-white/95 text-sm text-center px-4 leading-relaxed">
                            Комплексная интеллектуальная система управления, объединяющая в единый цифровой контур все процессы водоснабжения и водоотведения для обеспечения их надежности, управляемости и экономической эффективности.
                        </Text>

                        <View className="p-3 bg-white/10 backdrop-blur rounded-lg border border-white/20 max-w-xs">
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
                </View>

                <View className="w-full flex-1 justify-center items-center ">
                    <KeyboardAvoidingView
                        className="flex-1"
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
                    >
                        <View className="flex-1 justify-center items-center px-4 py-8">
                            {/* Карточка формы */}
                            <View className="w-full max-w-[500] bg-white rounded-2xl border border-gray-100 shadow-lg elevation-4">
                                <View className="p-6">
                                    {/* Заголовок */}
                                    <View className="items-center mb-6">
                                        <Text className="text-2xl font-bold text-gray-900 mb-2">Авторизация</Text>
                                        <Text className="text-sm text-gray-500">Войдите в систему для продолжения работы</Text>
                                    </View>

                                    {/* Форма */}
                                    <View className="gap-y-5">
                                        <InputContainer
                                            classNames={{ wrapper: "", header: "" }}
                                            headerText="Электронная почта"
                                            isRequired
                                            validText={validError.username}
                                        >
                                            <Input
                                                placeholder="Введите электронную почту"
                                                value={model.username}
                                                onChange={loginModel.setEmail}
                                                disabled={isLoading}
                                                type="email"
                                                isError={isErrorStart && !!validError.username}
                                            />
                                        </InputContainer>

                                        <InputContainer
                                            classNames={{ wrapper: "", header: "" }}
                                            headerText="Пароль"
                                            isRequired
                                            validText={validError.password}
                                        >
                                            <Password
                                                placeholder="Введите пароль"
                                                value={model.password}
                                                onChange={loginModel.setPassword}
                                                disabled={isLoading}
                                                isError={isErrorStart && !!validError.password}
                                            />
                                        </InputContainer>

                                        <Button
                                            onPress={handleSubmit}
                                            disabled={!canSubmit}
                                            styleColor="blue"
                                            className="w-full mt-2 py-3.5 bg-blue-600 active:bg-blue-700 shadow-md shadow-blue-400/50 elevation-2"
                                        >
                                            {isLoading ? "Загрузка..." : "Вход"}
                                        </Button>

                                        <TouchableOpacity
                                            className="py-3 items-center active:opacity-70"
                                            onPress={() => setIsRegister(true)}
                                        >
                                            <Text className="text-sm font-semibold text-blue-600">Заявка на регистрацию в системе</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </View>
        </>
    );
});
