import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { getDate } from '@/packages/functions/get-data/get-date';
import { getRequestTypeColor, getStatusColor } from '@/src/widgets/dispatcher/service-request/functions';
import { isRequestCancelled, isTOStageClose } from '@/packages/functions/is-value/is-stage-types';
import { RequestDescription, RequestStageDescription } from '@/packages/shared-components/request/request-discription';
import { Icon } from '@/packages/shared-ui/icon';
import { Colors } from '@/packages/design-tokens/colors';

type RequestCardProps = {
    request: any;
    onClick?: () => void;
};

export const RequestCard = ({ request, onClick }: RequestCardProps) => {
    const isCompleted = ['Done', 'Cancelled', 'Completed'].includes(request.status);

    return (
        <Pressable
            onPress={onClick}
            className="border border-gray-200 rounded-xl p-5 bg-white active:bg-blue-50 transition-colors"
        >
            <View className="flex-row items-start justify-between mb-2">
                <View className="flex-row items-center flex-wrap gap-2">
                    <View className="px-2 py-1 bg-gray-100 rounded-lg">
                        <Text className="text-gray-700 text-xs font-medium">
                            № {request.id}
                        </Text>
                    </View>

                    {request.type === 'Аварийная' && (
                        <View className="px-2 py-0.5 bg-red-100 rounded-full flex-row items-center gap-1">
                            <Text className="text-red-800 text-xs font-medium">
                                ⚠️ Аварийная
                            </Text>
                        </View>
                    )}
                </View>

                <View className="flex-row gap-2">
                    {getStatusColor(request.status)}
                    {getRequestTypeColor(request.type)}
                </View>
            </View>

            {/* Заголовок */}
            <Text className="font-bold text-gray-800 text-lg flex-shrink mb-2">
                {request.title}
            </Text>

            {/* Основная информация */}
            <View className=" items-start justify-between mb-4">
                {request.hardware && (
                    <Link href={`/dispatcher/hardware-about/${request.hardware.id}/passport/`} asChild>
                        <TouchableOpacity className="mb-4">
                            <View className="flex-row items-center gap-1 mb-1 text-sm">
                                <Text className="text-gray-500">
                                    <Icon systemName='settings-sharp' size={15} color={Colors.icon_gray} />
                                </Text>
                                <Text className="text-gray-500 font-medium">Оборудование</Text>
                            </View>
                            <Text className="font-medium text-gray-800">
                                {request.hardware.name}
                            </Text>
                        </TouchableOpacity>
                    </Link>
                )}

                <View className="flex-row gap-4">
                    <View>
                        <Text className="text-sm text-gray-500 font-medium">Создано</Text>
                        <Text className="text-sm text-gray-500">{getDate(request.createdAt)}</Text>
                    </View>

                    {/* Дата закрытия (только для завершённых заявок) */}
                    {isCompleted && request.closedAt && (
                        <View>
                            <Text className="text-sm text-gray-500 font-medium">Закрыто</Text>
                            <Text className="text-sm text-gray-500">{getDate(request.closedAt)}</Text>
                        </View>
                    )}
                </View>
            </View>

            {isTOStageClose(request.status, request.type) && request.cancelDiscription && (
                <View className="mb-4">
                    <RequestDescription
                        isCancelled={isRequestCancelled(request.status)}
                        description={request.cancelDiscription}
                    />
                </View>
            )}

            {!isTOStageClose(request.status, request.type) && request.stageDiscription && (
                <View className="mb-4">
                    <RequestStageDescription
                        statusRequest={request.status}
                        description={request.stageDiscription}
                    />
                </View>
            )}

            {/* Участники заявки */}
            <View className="pt-4 border-t border-gray-100">
                {request.status === "New" ? (
                    <View className="gap-8">
                        <View className="flex-row items-start gap-3">
                            <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center">
                                <Text className="text-blue-600">👤</Text>
                            </View>
                            <View>
                                <Text className="text-xs text-gray-500 uppercase">Создатель</Text>
                                <Text className="font-medium text-gray-800" numberOfLines={1}>
                                    {request.creator}
                                </Text>

                                {request.creatorsCompany && (
                                    <>
                                        <Text className="text-xs text-gray-500 uppercase mt-4">Компания</Text>
                                        <Text className="font-medium text-gray-800" numberOfLines={1}>
                                            {request.creatorsCompany.shortName}
                                        </Text>
                                    </>
                                )}
                            </View>
                        </View>
                    </View>
                ) : (
                    <View className="flex-row gap-8">
                        <View className="flex-row items-start gap-3">
                            <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center">
                                <Text className="text-green-600">✓</Text>
                            </View>

                            <View>
                                <Text className="text-xs text-gray-500 uppercase">Исполнитель</Text>
                                <Text className="font-medium text-gray-800" numberOfLines={1}>
                                    {request.implementer}
                                </Text>

                                {request.implementersCompany && (
                                    <>
                                        <Text className="text-xs text-gray-500 uppercase mt-4">Компания</Text>
                                        <Text className="font-medium text-gray-800" numberOfLines={1}>
                                            {request.implementersCompany.shortName}
                                        </Text>
                                    </>
                                )}
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </Pressable>
    );
};