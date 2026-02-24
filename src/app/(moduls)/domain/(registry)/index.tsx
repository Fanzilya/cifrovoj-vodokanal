import { useAuth } from '@/packages/entities/user/context';
import { useSearch } from '@/packages/shared-ui/Inputs/hooks/hook-search';
import { Search } from '@/packages/shared-ui/Inputs/input-search';
import { SwitchButton } from '@/packages/shared-ui/switch-button';
import { registryStore } from '@/src/features/domain/registry-objects/registry-model';
import { useRegistryQuery } from '@/src/features/domain/registry-objects/use-registry-query';
import { FilterObjects } from '@/src/widgets/domain/object-registry/filter-objects';
import { RegistryCard } from '@/src/widgets/domain/object-registry/registry-card';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { FlatList, Text, View } from 'react-native';

const RegistryObjectsPage = observer(() => {
  const { user } = useAuth();
  console.log(user)
  const { selectedObjectId, setSelected } = registryStore;

  const { data = [], isLoading, isError, refetch } = useRegistryQuery(user.id, user.baseRoleId);

  const { search, setSearch, results } = useSearch({ data, searchFields: ["name", "operatingOrganization"] });
  const listData = useMemo(() => results ?? [], [results]);

  return (
    <View className="flex-1 px-[20px] mt-[80px]">
      <View className="gap-4 mb-3">
        <View className="flex-row items-center gap-1">
          <View className="flex-1">
            <Search
              placeholder="Поиск по названию или организации..."
              value={search}
              onChange={setSearch}
              classNames={{
                container: 'border border-gray-300 rounded-lg',
                input: 'px-4 text-gray-800 text-sm',
              }}
            />
          </View>
          <FilterObjects />
        </View>

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


      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-custom-accent">Загрузка...</Text>
        </View>
      ) : (
        !listData.length ?
          <View className="flex-1 justify-center items-center">
            <Text className="text-custom-accent text-sm">Список пуст</Text>
          </View>
          :
          <FlatList
            data={listData}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            initialNumToRender={3} // сколько рендерить сначала
            maxToRenderPerBatch={2} // сколько догружать за раз
            windowSize={3} // размер "окна" видимости
            removeClippedSubviews={true} // удалять невидимые элементы из памяти
            renderItem={({ item }) => <RegistryCard item={item} />}
          />
      )}
    </View >
  );
});

export default RegistryObjectsPage;