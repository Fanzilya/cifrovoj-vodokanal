import { KeyboardAvoidingView, Platform, View } from "react-native";

interface Props {
    title: React.ReactNode;
    children: React.ReactNode;
}

export const AuthBlockContainer = ({ title, children }: Props) => {
    return (
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
                            {title}
                            {children}
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};