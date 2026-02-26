import { useAuth } from "@/packages/entities/user/context";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { Password } from "@/packages/shared-ui/Inputs/input-password";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { Button } from "@/packages/shared-ui/button/button";
import loginModel from "@/src/features/auth/login/login-model";
import { AuthBlockContainer } from "@/src/widgets/auth/auth-block-container";
import { AuthTitleContainer } from "@/src/widgets/auth/auth-block-title";
import { Link } from "expo-router";
import { observer } from "mobx-react-lite";
import { useCallback, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Text,
    View
} from "react-native";


const LoginScreen = observer(() => {
    const { setUser, initCompany, initTriecoCompany } = useAuth();
    const { model, validError, isLoading, canSubmit, isErrorStart, login } = loginModel;

    const handleSubmit = useCallback(() => {
        login(setUser, initCompany);
    }, [login, setUser, initCompany, initTriecoCompany]);


    return (
        <AuthBlockContainer
            title={
                <View className="items-center mb-6">
                    <AuthTitleContainer title='Авторизация' />
                    <Text className="text-sm text-gray-500 mt-2">Войдите в систему для продолжения работы</Text>
                </View>
            }


            children={
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
                        className="w-full mt-2 py-3.5 bg-custom-accent active:bg-blue-700 shadow-md shadow-blue-400/50 elevation-2 "
                    >
                        {isLoading ? "Загрузка..." : "Вход"}
                    </Button>

                    <Link href="/registration" className="py-3 text-center active:opacity-70">
                        <Text className="text-sm font-semibold text-blue-600">Заявка на регистрацию в системе</Text>
                    </Link>
                </View>
            }
        />
    );
});


export default LoginScreen;