// src/shared/components/mobile-panel/mobile-panel.tsx
import { View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Icon } from "@/packages/shared-ui/icon";

type TabItem = {
    icon: string; // имя иконки
    href: string; // маршрут страницы
};

type MobilePanelProps = {
    tabs: TabItem[];
};

export const MobilePanel = ({ tabs }: MobilePanelProps) => {
    const router = useRouter();

    return (
        <View className="flex-row items-center justify-around bg-white border-t border-gray-300 px-4 py-2">
            {tabs.map((tab, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => router.push(tab.href)}
                    className="items-center p-2"
                    accessibilityLabel={`Перейти к ${tab.icon}`}
                >
                    <Icon systemName={tab.icon} width={24} height={24} />
                </TouchableOpacity>
            ))}
        </View>
    );
};
