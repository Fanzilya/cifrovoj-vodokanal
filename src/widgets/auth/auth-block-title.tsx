import { Text } from "react-native";

interface Props {
    title: string;
}

export const AuthTitleContainer = ({ title }: Props) => {
    return (
        <Text className="text-2xl font-bold text-gray-900">{title}</Text>
    );
};