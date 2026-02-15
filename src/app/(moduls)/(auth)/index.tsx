import { useCallback, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { View, Text, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "@/src/packages/entities/user/context";
import loginModel from "@/src/features/auth/login/login-model";
import { useNavigation } from "expo-router";

export const LoginView = observer(() => {
    const { setUser, initCompany } = useAuth();
    const [isRegister, setIsRegister] = useState<boolean>(false);
    const { model, validError, isLoading, canSubmit, isErrorStart, login } = loginModel;
    const navigation = useNavigation();

    const handleSubmit = useCallback(() => {
        if (!canSubmit) return;
        login(setUser, initCompany, navigation);
    }, [canSubmit, login]);

    useEffect(() => {
        const logoutInfo = localStorage.getItem("logout");
        if (logoutInfo) {
            Toast.show({
                type: "info",
                text1: logoutInfo,
                visibilityTime: 3000,
            });
        }
        localStorage.clear();
    }, []);

    return (
        <>
            {/* <Registration show={isRegister} onClose={() => setIsRegister(false)} /> */}

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1 justify-center px-4 bg-gray-50"
            >
                {/* Основной контейнер формы */}
                <View className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full max-w-xs mx-auto overflow-hidden">
                    <Text>ФОРМА</Text>
                </View>
            </KeyboardAvoidingView>

            {/* Toast сообщения */}
            <Toast />
        </>
    );
});
