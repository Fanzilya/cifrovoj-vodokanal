import { View, Text } from 'react-native';

interface Props {
  description: string;
  isCancelled?: boolean;
  className?: string;
  statusRequest?: string;
}

export const RequestDescription = ({ description, isCancelled, className }: Props) => {
  const hasAttention = description.includes('Внимание!');

  const bgColor = hasAttention ? 'bg-red-50' : (isCancelled ? 'bg-red-50' : 'bg-green-50');
  const borderColor = hasAttention ? 'border-red-200' : (isCancelled ? 'border-red-200' : 'border-green-200');
  const titleColor = hasAttention ? 'text-red-700' : (isCancelled ? 'text-red-700' : 'text-green-700');
  const textColor = hasAttention ? 'text-red-800' : (isCancelled ? 'text-red-800' : 'text-green-800');

  const headerText = isCancelled ? 'Причина отмены' : 'Результат';

  return (
    <View
      className={`
        p-2 rounded-md border
        ${bgColor} ${borderColor}
        ${className || ''}
      `}
    >
      <Text className={`text-sm font-medium uppercase tracking-wide mb-0.5 ${titleColor}`}>
        {headerText}
      </Text>
      <Text className={`text-sm leading-relaxed ${textColor}`}>
        {description}
      </Text>
    </View>
  );
};

export const RequestStageDescription = ({ description, statusRequest, className }: Props) => {
  const bgColor = statusRequest === "Canceled" ? 'bg-red-50' : (statusRequest === "Completed" ? "bg-green-50" : 'bg-gray-50');
  const borderColor = statusRequest === "Canceled" ? 'border-red-200' : (statusRequest === "Completed" ? "border-green-200" : 'border-gray-200');
  const titleColor = statusRequest === "Canceled" ? 'text-red-700' : (statusRequest === "Completed" ? "text-green-700" : 'text-gray-700');
  const textColor = statusRequest === "Canceled" ? 'text-red-800' : (statusRequest === "Completed" ? "text-green-800" : 'text-gray-800');

  const headerText = 'Описание последнего этапа';

  return (
    <View
      className={`
        p-2 rounded-md border
        ${bgColor} ${borderColor}
        ${className || ''}
      `}
    >
      <Text className={`text-sm font-medium uppercase tracking-wide mb-0.5 ${titleColor}`}>
        {headerText}
      </Text>
      <Text className={`text-sm leading-relaxed ${textColor}`}>
        {description}
      </Text>
    </View>
  );
};