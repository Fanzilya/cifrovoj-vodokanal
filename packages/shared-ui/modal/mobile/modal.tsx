import { useCallback, useEffect } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Modal as RNModal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions
} from "react-native";
import { Icon } from "@/packages/shared-ui/icon";

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export interface ModalProps {
    show: boolean;
    title?: string;
    setShow: (show: boolean) => void;
    children?: React.ReactNode;
    footerSlot?: React.ReactNode;
    classNames?: {
        wrapper?: string;
        overlay?: string;
        container?: string;
        panel?: string;
        header?: string;
        title?: string;
        close?: string;
        content?: string;
        body?: string;
        footer?: string;
    };
    closeOnOverlay?: boolean;
    type?: 'center' | 'left';
    wrapperId?: string;
}

export const Modal = ({
    show,
    title,
    setShow,
    children,
    footerSlot,
    classNames,
    closeOnOverlay = false,
    type = "center",
    wrapperId,
}: ModalProps) => {
    const handleClose = useCallback(() => {
        setShow(false);
    }, [setShow]);

    // Закрытие по нажатию Escape (на Android)
    useEffect(() => {
        const onBackPress = () => {
            if (show) {
                handleClose();
                return true;
            }
            return false;
        };

        if (show && Platform.OS === "android") {
            const subscription = require("react-native").BackHandler.addEventListener(
                "hardwareBackPress",
                onBackPress
            );
            return () => subscription.remove();
        }
    }, [show, handleClose]);

    if (!show) return null;

    // Базовые стили
    const baseWrapper = "flex-1";
    const baseContainer = type === "center"
        ? "flex-1 justify-center items-center px-4"
        : "flex-1 justify-start";
    const basePanel = type === "center"
        ? "w-full rounded-2xl max-h-[90%] bg-white shadow-lg"
        : "h-full w-[90%] bg-white shadow-xl rounded-r-2xl";
    const baseHeader = "flex-row items-center justify-between border-b border-gray-200 px-6 py-4";
    const baseTitle = "text-xl font-semibold text-gray-800";
    const baseCloseIcon = "text-gray-500";
    const baseContent = "flex-1";
    const baseBody = "px-4 py-3";
    const baseFooter = "border-t border-gray-200 p-4 bg-gray-50";
    const baseOverlay = "absolute inset-0 bg-black/50";

    // Функция для объединения классов
    const cn = (...classes: (string | undefined)[]) => {
        return classes.filter(Boolean).join(" ");
    };

    const animationType = type === "center" ? "fade" : "slide";
    const transparent = type === "center";

    return (
        <RNModal
            visible={show}
            transparent={transparent}
            animationType={animationType}
            onRequestClose={handleClose}
            hardwareAccelerated
        >
            <View className={cn(baseWrapper, classNames?.wrapper)}>
                {/* Overlay */}
                <TouchableWithoutFeedback onPress={closeOnOverlay ? handleClose : undefined}>
                    <View className={cn(
                        baseOverlay,
                        type === 'center' ? classNames?.overlay : ''
                    )} />
                </TouchableWithoutFeedback>

                {/* Container */}
                <View className={cn(baseContainer, classNames?.container)}>
                    {/* Panel */}
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        className={cn(basePanel, classNames?.panel)}
                    >
                        {/* Header */}
                        {title && (
                            <View className={cn(baseHeader, classNames?.header)}>
                                <Text className={cn(baseTitle, classNames?.title)}>{title}</Text>
                                <TouchableOpacity onPress={handleClose} className="p-2">
                                    <Icon systemName="close" className={cn(baseCloseIcon, classNames?.close)} />
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* Content */}
                        <View className={cn(baseContent, classNames?.content)}>
                            <View className={cn(baseBody, classNames?.body)}>{children}</View>
                        </View>

                        {/* Footer */}
                        {footerSlot ? (
                            <View className={cn(baseFooter, classNames?.footer)}>{footerSlot}</View>
                        ) : null}
                    </KeyboardAvoidingView>
                </View>
            </View>
        </RNModal>
    );
};
