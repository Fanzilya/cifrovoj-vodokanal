// src/app/(moduls)/(auth)/menu-moduls.tsx
import { useAuth } from "@/src/packages/entities/user/context";
import { Role } from "@/src/packages/entities/user/enums";
import { Link } from "expo-router";
import { observer } from "mobx-react-lite";
import { Pressable, Text, View } from "react-native";
import { tw } from "nativewind";

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

export const MenuModulsView = observer(() => {
  const { user } = useAuth();

  return (
    <View className="w-full max-w-[664px] bg-white rounded-2xl border border-gray-100 p-8 mx-auto shadow-lg">
      {/* Header */}
      <View className="items-center mb-8">
        <Text className="text-xl text-gray-600 mb-2 uppercase">Приветствуем в</Text>
        <Text className="text-xl font-bold text-blue-600 uppercase">ИАС «ЦИФРОВОЙ ВОДОКАНАЛ»</Text>
      </View>

      {/* Grid */}
      <View className="flex flex-row flex-wrap justify-between gap-5">
        {cartLinks.map((item, index) => {
          const hasAccess = item.userIds.length > 0 && item.link.length > 0;

          if (hasAccess) {
            return (
              <View key={index} className="w-[48%] min-w-[140px]">
                <Link href={item.link as any} asChild>
                  <Pressable className="bg-blue-600 rounded-xl min-h-[100px] py-6 px-4 justify-center items-center shadow-md active:opacity-90">
                    <Text className="text-lg font-bold text-white text-center leading-tight" numberOfLines={2}>
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
              className="w-[48%] min-w-[140px] bg-gray-500 rounded-xl min-h-[100px] py-6 px-4 justify-center items-center opacity-70 shadow"
            >
              <Text className="text-lg font-bold text-white text-center leading-tight" numberOfLines={2}>
                {item.name}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
});
