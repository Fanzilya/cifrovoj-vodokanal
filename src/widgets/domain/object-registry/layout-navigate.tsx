import { Colors } from "@/packages/design-tokens/colors";
import { Icon } from "@/packages/shared-ui/icon";
import { Link, usePathname } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const navLinks: {
    text: string,
    link: string,
    icon: string,
    type: string,
}[] = [
        {
            text: "Реестр",
            link: "/domain",
            icon: "list-outline",
            type: "ion",
        },
        {
            text: "Карта",
            link: "/domain/registry-map",
            icon: "map",
            type: "ion",
        },
        {
            text: "Уведомление",
            link: "/domain/notifications",
            icon: "notifications",
            type: "ion",
        },
        {
            text: "Профиль",
            link: "/domain/user",
            icon: "user",
            type: "feather",
        },
    ]

export const LayoutNavitgate = () => {

    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingBottom: insets.bottom }} className='absolute bottom-0 left-0 w-full bg-white border-t border-gray-300'>
            <View className='flex-row items-center justify-around h-[70px] px-5 py-1'>
                {navLinks.map((item, index) => (
                    <Link href={item.link} asChild key={index}>
                        <TouchableOpacity className={`flex-1 items-center rounded-lg py-2 ${pathname === item.link ? 'bg-custom-accent' : 'text-gray-700'}`}>
                            <View className="items-center">
                                <Icon
                                    type={item.type}
                                    systemName={item.icon}
                                    width={30}
                                    color={pathname === item.link ? 'white' : Colors.icon_gray}
                                />
                                <Text className={`text-[10px]  ${pathname === item.link ? "text-white" : Colors.icon_gray}`}>{item.text}</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </View>
    );
}