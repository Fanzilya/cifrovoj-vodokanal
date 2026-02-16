// src/app/(moduls)/(auth)/menu-moduls.tsx
import { Role } from "@/packages/entities/user/enums";
import { Link } from "expo-router";
import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";

type MenuItemType = {
    name: string;
    link: string;
    userIds: number[];
};

export const cartLinks: MenuItemType[] = [
    {
        name: "Единый реестр объектов",
        link: "/domain/list",
        userIds: [Role.Client, Role.Ministry],
    },
    {
        name: "Управление ЖБО",
        link: "/gis/companies",
        userIds: [Role.Client, Role.Ministry],
    },
    {
        name: "Оцифровка сетей",
        link: "",
        userIds: [],
    },
    {
        name: "Лаборатория",
        link: "",
        userIds: [],
    },
    {
        name: "Услуги",
        link: "",
        userIds: [],
    },
    {
        name: "Сопровождение пользователей",
        link: "",
        userIds: [Role.Client, Role.Ministry],
    },
];

const MenuModulsView = observer(() => {
    return (
        <View className="w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto bg-white rounded-2xl border border-gray-100 p-5 shadow-md">
            {/* Header */}
            <View className="items-center mb-6">
                <Text className="text-lg text-gray-600 mb-1 uppercase font-medium">Приветствуем в</Text>
                <Text className="text-xl text-center font-bold text-custom-accent uppercase">ИАС «ЦИФРОВОЙ ВОДОКАНАЛ»</Text>
            </View>

            {/* Grid: 1 column on small screens, 2 on medium+ */}
            <View className="flex flex-row flex-wrap justify-between gap-4">
                {cartLinks.map((item, index) => {
                    const hasAccess = item.userIds.length > 0 && !!item.link;

                    if (hasAccess) {
                        return (
                            <View key={index} className="flex-1 min-w-[140px] max-w-full">
                                <Link href={item.link as any} asChild>
                                    <Pressable className="bg-custom-accent rounded-xl min-h-20 py-4 px-3 justify-center items-center shadow active:opacity-90">
                                        <Text className="text-base font-semibold text-white text-center leading-tight" numberOfLines={2}>
                                            {item.name}
                                        </Text>
                                    </Pressable>
                                </Link>
                            </View>
                        );
                    }

                    return (
                        <View
                            key={index}
                            className="flex-1 min-w-[140px] max-w-full bg-gray-500 rounded-xl min-h-20 py-4 px-3 justify-center items-center opacity-70"
                        >
                            <Text className="text-base font-semibold text-white text-center leading-tight" numberOfLines={2}>
                                {item.name}
                            </Text>
                        </View>
                    );
                })}
            </View>
        </View>
    );
});

export default MenuModulsView;
