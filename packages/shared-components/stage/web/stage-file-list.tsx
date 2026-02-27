import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface Props {
    files: any;
    onAction: (id: number) => void;
}

export const StageFileList = ({ files, onAction }: Props) => {
    return (
        <View className="">
            <Text className="text-sm font-medium text-gray-700 mb-2">Загруженные файлы:</Text>
            <ScrollView className="max-h-40" showsVerticalScrollIndicator={true}>
                <View className="space-y-2">
                    {files.map((fileItem: any) => (
                        <View
                            key={fileItem.id}
                            className="flex-row items-center justify-between p-2 bg-gray-50 rounded-lg"
                        >
                            <View className="flex-row items-center gap-2 flex-1">
                                <Text className="text-base">
                                    {fileItem.type === "photo" ? "📷" : "📄"}
                                </Text>
                                <Text className="text-gray-800 flex-1" numberOfLines={1}>
                                    {fileItem.fileName}
                                </Text>
                            </View>

                            <TouchableOpacity
                                onPress={() => onAction(fileItem.id)}
                            >
                                <Text
                                    className={`text-xs font-semibold ${fileItem.fileId
                                        ? "text-green-500"
                                        : "text-red-500"
                                        }`}
                                >
                                    {fileItem.fileId ? "Посмотреть" : "Удалить"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}