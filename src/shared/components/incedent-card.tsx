import { View, Text } from 'react-native';
import { getDate } from '@/packages/functions/get-data/get-date';
import { getIncidentColor, getIncidentText } from '@/packages/functions/get-data/get-incident-status';

interface IncidentCardProps {
    incident: any;
    onPress?: () => void;
}

export const IncidentCard = ({ incident, onPress }: IncidentCardProps) => {
    return (
        <View className="bg-white rounded-xl p-4 border border-gray-200 active:bg-gray-50" onTouchEnd={onPress}>
            <View className='flex-row items-center mb-4'>
                <Text className="text-sm text-gray-500">Статус работы</Text>
                <View className={`ml-auto`}>
                    <Text className={`px-2 py-1 rounded-full text-xs font-medium ${getIncidentColor(incident.status)}`}>
                        {getIncidentText(incident.status)}
                    </Text>
                </View>
            </View>

            <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1 max-w-[50%]">
                    <Text className="text-sm text-gray-500 mb-1">Объект</Text>
                    <Text className="font-semibold text-sm text-gray-900">
                        {incident.object.name}
                    </Text>
                </View>

                <View className="flex-1 items-end max-w-[50%]">
                    <Text className="text-sm text-gray-500 mb-1">Оборудование</Text>
                    <Text className="text-gray-800 font-medium text-sm text-right">
                        {incident.hardwareName}
                    </Text>
                </View>
            </View>

            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-1 max-w-[50%]">
                    <Text className="text-sm text-gray-500 mb-1">Авария</Text>
                    <Text className="text-gray-800 font-medium text-sm">
                        {incident.nodeName || '—'}
                    </Text>
                </View>

                <View className="flex-1 max-w-[50%] items-end">
                    <Text className="text-sm text-gray-500 mb-1">Время</Text>
                    <Text className="text-gray-800 font-medium text-sm">
                        {getDate(incident.createdAt)}
                    </Text>
                </View>
            </View>
        </View>
    );
};