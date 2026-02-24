import { Icon } from "@/packages/shared-ui/icon";
import { Link, usePathname } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const navLinks: {
    text: string,
    link: string,
    icon: string,
    iconActive: string
}[] = [
        {
            text: "Карта",
            link: "/domain",
            icon: "list-clipboard",
            iconActive: "list-clipboard-white",
        },
        {
            text: "Реестр",
            link: "/domain/registry-map",
            icon: "map",
            iconActive: "map-white",
        }
    ]

export const LayoutNavitgate = () => {

    const pathname = usePathname();
    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingBottom: insets.bottom }} className='absolute bottom-0 left-0 w-full bg-white border-t border-gray-300'>
            <View className='flex flex-row items-center justify-around h-[70px] px-5'>
                {navLinks.map((item, index) => (
                    <Link href={item.link} asChild>
                        <TouchableOpacity className={`flex-1 items-center rounded-[20px] py-2 ${pathname === item.link ? 'bg-custom-accent' : 'text-gray-700'}`}>
                            <View className="w-6 h-6 mb-1">
                                <Icon
                                    systemName={pathname === item.link ? item.iconActive : item.icon}
                                    width={30}
                                />
                            </View>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </View>
    );
}