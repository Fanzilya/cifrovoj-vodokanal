import { Modal as RNModal, View, Text, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import { useCallback, useEffect } from "react";
import { Icon } from "../icon";

import type { ModalProps } from "./setting/type";

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
                return true; // предотвращаем выход из приложения
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

    // Определение стилей в зависимости от типа модального окна
    const overlayClasses = classNames?.overlay ?? "bg-black/50";
    const containerClasses = type === "center"
        ? "flex-1 justify-center px-4"
        : "flex-1 justify-end";

    const panelClasses = type === "center"
        ? "rounded-2xl max-h-[90%] mx-4 bg-white shadow-lg"
        : "h-[90%] w-full bg-white rounded-t-2xl";

    const headerClasses = classNames?.header ?? "flex-row items-center justify-between border-b border-gray-200 px-6 py-4";
    const titleClasses = classNames?.title ?? "text-xl font-semibold text-gray-800";
    const closeIconClasses = classNames?.close ?? "text-gray-500";

    const contentClasses = classNames?.content ?? "flex-1";
    const bodyClasses = classNames?.body ?? "px-4 py-3";
    const footerClasses = classNames?.footer ?? "border-t border-gray-200 p-4 bg-gray-50";

    return (
        <RNModal
            visible={show}
            transparent={type === "center"}
            animationType={type === "center" ? "fade" : "slide"}
            onRequestClose={handleClose}
            hardwareAccelerated
        >
            {/* Overlay */}
            <TouchableWithoutFeedback onPress={closeOnOverlay ? handleClose : undefined}>
                <View className={`absolute inset-0 ${overlayClasses}`} />
            </TouchableWithoutFeedback>

            {/* Container */}
            <View className={containerClasses}>
                {/* Panel */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    className={panelClasses}
                >
                    {/* Header */}
                    <View className={headerClasses}>
                        <Text className={titleClasses}>{title}</Text>
                        <TouchableOpacity onPress={handleClose} className="p-2">
                            <Icon
                                systemName="close"
                                width={24}
                                height={24}
                                className={closeIconClasses}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* Content */}
                    <View className={contentClasses}>
                        <View className={bodyClasses}>{children}</View>
                    </View>

                    {/* Footer */}
                    {footerSlot ? <View className={footerClasses}>{footerSlot}</View> : null}
                </KeyboardAvoidingView>
            </View>
        </RNModal>
    );
};
