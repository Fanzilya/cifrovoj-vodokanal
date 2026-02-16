import { useAuth } from "@/packages/entities/user/context";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Password } from "@/packages/shared-ui/Inputs/input-password";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { Button } from "@/packages/shared-ui/button/button";
import loginModel from "@/src/features/auth/login/login-model";
import { Registration } from "@/src/widgets/auth/modal-registration";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Linking,
    Platform,
    Text,
    TouchableOpacity,
    View
} from "react-native";


const LoginScreen = observer(() => {

    const [isRegister, setIsRegister] = useState(false);
    const { setUser, initCompany, initTriecoCompany } = useAuth();
    const { model, validError, isLoading, canSubmit, isErrorStart, login } = loginModel;

    const handleSubmit = useCallback(() => {
        login(setUser, initCompany);
    }, [login, setUser, initCompany, initTriecoCompany]);





    return (
        <>
            {isRegister && <Registration show={isRegister} onClose={() => setIsRegister(false)} />}

            <View className="w-full flex-1">
                <KeyboardAvoidingView
                    className="flex-1"
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                    keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
                >
                    <View className="flex-1 w-full justify-center items-center">
                        {/* Карточка формы */}
                        <View className="w-full bg-white rounded-2xl border border-gray-100 shadow-lg elevation-4">
                            <View className="p-6">
                                {/* Заголовок */}
                                <View className="items-center mb-6">
                                    <Text className="text-2xl font-bold text-gray-900 mb-2">Авторизация</Text>
                                    <Text className="text-sm text-gray-500">Войдите в систему для продолжения работы</Text>
                                </View>

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
                                        className="w-full mt-2 py-3.5 bg-custom-accent active:bg-blue-700 shadow-md shadow-blue-400/50 elevation-2"
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

        </>
    );
});


export default LoginScreen;