import { objectStagesLabels } from "@/packages/entities/object/config";
import { getDate } from "@/packages/functions/get-data/get-date";
import { getObjectStageColor } from "@/packages/functions/get-data/get-object-stage";
import { Icon } from "@/packages/shared-ui/icon";
import { Link } from "expo-router";
import { Image, Text, View } from "react-native";

interface Props {
    item: any
}

const PLC_LABELS = { 5: 'ПЛК-1 (технология)', 6: 'ПЛК-2 (общий)', };

export const RegistryCard = ({ item }: Props) => {
    return (
        <Link href={`/domain/${item.id}`} className="mb-4 rounded-xl border border-gray-200 bg-white overflow-hidden">
            <View className="h-48 w-full">
                {item.fileId ? (
                    <Image source={{ uri: `https://triapi.ru/research/api/FileStorage/download?id=${item.fileId}` }}
                        onError={({ nativeEvent: { error } }) => { console.log('Image load error:', error) }}
                        className="h-full w-full rounded-tl-xl rounded-tr-xl object-cover"
                        resizeMode="cover"
                    />
                ) : (
                    <View className="h-full w-full bg-blue-50 justify-center items-center">
                        <Icon systemName="gallery" />
                        <Text className="text-gray-500 text-sm mt-1">Нет изображения</Text>
                    </View>
                )}
            </View>

            <View className="w-full p-4">
                <Text className="text-lg font-semibold text-gray-800 mb-2">{item.name}</Text>

                <TextBlock name="Статус объекта" >
                    <Text className={`inline px-2 py-1 rounded-full text-sm text-white font-semibold ${getObjectStageColor(item.stage)}`}>
                        {objectStagesLabels[item.stage]}
                    </Text>
                </TextBlock>

                <TextBlock name="Дата ввода в эксплуатацию">
                    <Text className="text-sm font-semibold text-gray-700">
                        {item.commissioningDate !== '0001-01-01T00:00:00' ? getDate(item.commissioningDate, 'short') : '—'}
                    </Text>
                </TextBlock>


                <TextBlock name="Эксплуатирующая организация">
                    <Text className="text-sm font-semibold text-gray-700 text-right">
                        {item.operatingOrganization || '—'}
                    </Text>
                </TextBlock>

                <LineBlock />

                <TextBlock name="Проектная производительность">
                    <Text className="text-sm font-semibold text-gray-700 text-right">
                        {item.projectEfficiency} м³
                    </Text>
                </TextBlock>

                <TextBlock name="Сред. сут. произв.">
                    <View className="flex-row items-center gap-1">
                        <Icon systemName="trending-down" />
                        <Text className="text-sm text-red-600 font-medium">0 м³</Text>
                    </View>

                </TextBlock>

                <TextBlock name="Часовая производительность">
                    <View className="flex-row items-center gap-1">
                        <Icon systemName="trending-up" />
                        <Text className="text-sm text-[#4A85F6] font-medium">0 м³</Text>
                    </View>
                </TextBlock>

                <LineBlock />

                <TextBlock name="Статус подключения к ПЛК">
                    <View>
                        {item.plcList.length > 0 ? (
                            item.plcList.map((plc, idx) => (
                                <View key={idx} className={`flex-row items-center px-2 py-1 rounded-full mb-1 ${plc.status ? 'bg-green-100 border border-green-200' : 'bg-red-100 border border-red-200'}`}>
                                    <View className={`w-2 h-2 rounded-full mr-2 ${plc.status ? 'bg-green-500' : 'bg-red-500'}`} />
                                    <Text className={`text-xs font-semibold ${plc.status ? 'text-green-800' : 'text-red-800'}`}>
                                        {PLC_LABELS[plc.plcId as keyof typeof PLC_LABELS] || `ПЛК-${plc.plcId}`}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <View className="flex-row items-center px-2 py-1 rounded-full bg-red-100 border border-red-200">
                                <View className="w-2 h-2 rounded-full mr-2 bg-red-500" />
                                <Text className="text-xs font-semibold text-red-800">Не подключено</Text>
                            </View>
                        )}
                    </View>
                </TextBlock>
            </View>
        </Link >
    );
}




function TextBlock({ name, children }: { name: string, children: React.ReactNode }) {
    return (
        <View className="flex-row items-center justify-between  gap-2 mb-2">
            <Text className="text-sm text-gray-600 max-w-[60%]">{name}</Text>
            {children}
        </View>
    )
}


function LineBlock() {
    return <View className="h-[1px] w-full bg-gray-400 my-2" />
}