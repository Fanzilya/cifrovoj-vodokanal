import { objectStagesLabels } from '@/packages/entities/object/config';
import { PassportRegistryDataType } from '@/packages/entities/object/type';
import { useAuth } from '@/packages/entities/user/context';
import { getObjectStageColor } from '@/packages/functions/get-data/get-object-stage';
import { Icon } from '@/packages/shared-ui/icon';
import { useSearch } from '@/packages/shared-ui/Inputs/hooks/hook-search';
import { Search } from '@/packages/shared-ui/Inputs/input-search';
import { SwitchButton } from '@/packages/shared-ui/switch-button';
import { registryModel } from '@/src/features/domain/registry-objects/registry-model';
import { FilterObjects } from '@/src/widgets/domain/object-registry/filter-objects';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const PLC_LABELS = { 5: 'ПЛК-1 (технология)', 6: 'ПЛК-2 (общий)', };

const RegistryObjectsPage = observer(() => {
  const router = useRouter();

  const { user } = useAuth();

  const { model, init, isLoading } = registryModel;
  const { search, setSearch, results } = useSearch<PassportRegistryDataType>({ data: model, searchFields: ['name', 'operatingOrganization'] });

  useEffect(() => {
    if (user) {
      init(user.id, user.baseRoleId);
    }
  }, [user]);

  return (
    <View className="flex-1">
      <View className="mb-6 bg-white rounded-2xl border border-gray-200 p-4">
        <View className="gap-4">
          <View className="flex-row gap-3 mt-4">
            <TouchableOpacity
              onPress={() => router.push("/domain/registry-map")}
              className="flex-1 sm:flex-initial flex-row items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 rounded-lg"
            >
              <Icon systemName={"list"} />
              <Text className="text-sm font-medium text-gray-700">
                Реестр объектов
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

      {isLoading ?
        <View className="flex-1 justify-center items-center">
          <Text className="text-custom-accent">Загрузка...</Text>
        </View>
        :
        <ScrollView className="flex-1 px-4 py-2">
          {/* Search and Filters */}
          <View className="gap-4">
            <View className="flex-row items-center gap-2">
              <View className="flex-1">
                <Search
                  placeholder="Поиск по названию или организации..."
                  value={search}
                  onChange={setSearch}
                  classNames={{
                    container: 'border border-gray-300 rounded-lg h-11',
                    input: 'px-4 text-gray-800 text-sm',
                  }}
                />
              </View>
              <FilterObjects />
            </View>

            {/* Mobile switches */}
            <View className="flex-row items-center gap-2 pt-4 border-t border-gray-200">
              <SwitchButton
                label=""
                onChange={() => { }}
                classNames={{
                  container: 'gap-1',
                  button: 'w-[40px] rounded-[150px] bg-[#757575] p-[3px]',
                  circle: 'rounded-[150px] bg-white h-[18px] w-[18px]',
                }}
              />
              <Text className="text-sm text-gray-700">Диспетчерская</Text>

              <SwitchButton
                label=""
                onChange={() => { }}
                classNames={{
                  container: 'gap-1',
                  button: 'w-[40px] rounded-[150px] bg-[#757575] p-[3px]',
                  circle: 'rounded-[150px] bg-white h-[18px] w-[18px]',
                }}
              />
              <Text className="text-sm text-gray-700">Управление ЖБО</Text>
            </View>
          </View>

          {results && (results.length === 0 ? (<View className="flex-1 justify-center items-center">
            <Text className="text-custom-accent text-sm">Список пуст</Text>
          </View>
          ) : (
            results.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="mb-4 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                onPress={() => {
                  // В React Native навигация через router.push('/domain/passport/...')
                  // Оставлено как заглушка
                }}
              >
                {/* Image */}
                <View className="h-48 w-full relative">
                  {item.fileId ? (
                    <Image
                      source={{
                        uri: `https://triapi.ru/research/api/FileStorage/download?id=${item.fileId}`,
                      }}
                      onError={({ nativeEvent: { error } }) => {
                        console.log('Image load error:', error);
                      }}
                      className="h-full w-full object-cover"
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="h-full w-full bg-blue-50 justify-center items-center">
                      <Icon systemName="gallery" />
                      <Text className="text-gray-500 text-sm mt-1">Нет изображения</Text>
                    </View>
                  )}
                </View>

                {/* Content */}
                <View className="p-4">
                  {/* Name */}
                  <Text className="text-lg font-semibold text-gray-800 mb-2">{item.name}</Text>

                  {/* Stage */}
                  <View className="mb-3">
                    <Text
                      className={`inline px-2 py-1 rounded-full text-sm text-white font-semibold ${getObjectStageColor(
                        item.stage
                      )}`}
                    >
                      {objectStagesLabels[item.stage]}
                    </Text>
                  </View>

                  {/* Date */}
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-sm text-gray-600">Дата ввода в эксплуатацию</Text>
                    <Text className="text-sm font-semibold text-gray-700">
                      {/* {item.commissioningDate !== '0001-01-01T00:00:00'
                    ? getDate(item.commissioningDate, 'short')
                    : '—'} */}
                    </Text>
                  </View>

                  {/* Organization */}
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-sm text-gray-600">Эксплуатирующая организация</Text>
                    <Text className="text-sm font-semibold text-gray-700">
                      {item.operatingOrganization || '—'}
                    </Text>
                  </View>

                  {/* PLC Status */}
                  <View className="mb-2">
                    <Text className="text-sm text-gray-600 mb-1">Статус подключения к ПЛК</Text>
                    {item.plcList.length > 0 ? (
                      item.plcList.map((plc, idx) => (
                        <View
                          key={idx}
                          className={`flex-row items-center px-2 py-1 rounded-full mb-1 ${plc.status
                            ? 'bg-green-100 border border-green-200'
                            : 'bg-red-100 border border-red-200'
                            }`}
                        >
                          <View
                            className={`w-2 h-2 rounded-full mr-2 ${plc.status ? 'bg-green-500' : 'bg-red-500'
                              }`}
                          />
                          <Text
                            className={`text-xs font-semibold ${plc.status ? 'text-green-800' : 'text-red-800'
                              }`}
                          >
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

                  {/* Efficiencies */}
                  <View className="mt-3 space-y-1">
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-gray-600">Проектная производительность</Text>
                      <Text className="text-sm font-semibold text-gray-700 text-right">
                        {item.projectEfficiency} м³
                      </Text>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-gray-600">Сред. сут. произв.</Text>
                      <View className="flex-row items-center gap-1">
                        <Icon systemName="trending-down" />
                        <Text className="text-sm text-red-600 font-medium">0 м³</Text>
                      </View>
                    </View>
                    <View className="flex-row justify-between">
                      <Text className="text-sm text-gray-600">Часовая производительность</Text>
                      <View className="flex-row items-center gap-1">
                        <Icon systemName="trending-up" />
                        <Text className="text-sm text-[#4A85F6] font-medium">0 м³</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ))}
        </ScrollView>
      }
    </View >
  );
});

export default RegistryObjectsPage;