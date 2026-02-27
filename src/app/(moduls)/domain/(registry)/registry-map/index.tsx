import React, { useEffect, useState, useRef } from "react";
import { View, Text, Pressable, ScrollView, FlatList, Modal } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import VKMap from "@/src/widgets/domain/registry-map/registry-map";
import { Colors } from "@/packages/design-tokens/colors";
import { registryMapModel } from "@/src/features/domain/registry-map/registry-map-model";
import { useAuth } from "@/packages/entities/user/context";
import PieChartComponent from "@/src/widgets/domain/registry-map/pie-chart-component";
import { Button } from "@/packages/shared-ui/button/button";
import { RequestCard } from "@/src/shared/components/service-card";
import { IncidentCard } from "@/src/shared/components/incedent-card";
import { ListBlock } from "@/src/widgets/domain/registry-map/list-block";
import { observer } from "mobx-react-lite";
import { ServiceStagesPanel } from "@/packages/shared-components/stage/android/stages-panel";
import Toast from "react-native-toast-message";


const DomainRegistryMapPage = observer(() => {
  const { user } = useAuth()

  const {
    init,
    services,
    incidents,
    setIsPanel,
    isPanel,
    isService,
    serviceStatusCounter,
    chartData,
    serviceTypeCounter,
    objectPoints,
    completeService,
    cancelService,
    completePlanedService,

    showPanel,
    showStagePanel,
    focusIncedent,
    focusService,
    setShowPanel,
    setShowStagePanel
  } = registryMapModel



  useEffect(() => {
    if (user?.id && user?.baseRoleId) {
      init(user?.id, user?.baseRoleId);
    }
  }, [user?.id, user?.baseRoleId]);


  const [typeTable, setTypeTable] = useState<"services" | "incident">("services");

  const [isModalVisible, setIsModalVisible] = useState(false)

  const callBack = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }


  return (
    <>
      {isPanel &&
        <ServiceStagesPanel
          completeService={completeService}
          cancelService={cancelService}
          completePlanedService={completePlanedService}
          show={isPanel}
          onClose={() => setIsPanel(false, 0, null)}
          isService={isService}
        />
      }


      <ScrollView>
        <View className="gap-5 mb-10">
          <View className={`w-full xl:w-[75%] h-[400px] rounded-xl overflow-hidden bg-gray-400`}>
          </View>

          <View className="bg-white/90 rounded-xl shadow-sm p-5">
            <View className="w-full">
              <View className="flex-row items-center gap-2 border-b-2 border-gray-200 mb-6 pb-3">
                <View className="w-2 h-2 bg-green-500 rounded-full" />
                <Text className="text-gray-900 text-sm font-semibold">
                  Объекты онлайн: <Text className="text-gray-600 font-normal">1 из 1</Text>
                </Text>
              </View>

              <View className="bg-red-50 p-2 rounded-xl mb-2 flex-row items-center justify-between">
                <Text className="text-sm font-medium">Инциденты</Text>
                <Text className="font-semibold text-red-600">{incidents.length}</Text>
              </View>

              <View className="bg-blue-50 p-2 rounded-xl mb-4 flex-row items-center justify-between">
                <Text className="text-sm font-medium">Заявки</Text>
                <Text className="font-semibold text-blue-600">{services.length}</Text>
              </View>

              <View className="flex-row items-center justify-between pb-2 border-b border-gray-200 mb-3">
                <Text className="text-sm">Ожидают обработки</Text>
                <Text className="font-bold text-sm">{serviceStatusCounter.new}</Text>
              </View>

              <View className="flex-row items-center justify-between pb-2 border-b border-gray-200 mb-3">
                <Text className="text-sm">Успешно закрыты</Text>
                <Text className="font-bold text-sm">{serviceStatusCounter.complete}</Text>
              </View>

              <View className="flex-row items-center justify-between pb-2 border-b border-gray-200 mb-3">
                <Text className="text-sm">Отменённые заявки</Text>
                <Text className="font-bold text-sm">{serviceStatusCounter.cancle}</Text>
              </View>
            </View>


            <View className="w-full h-[200px] mt-4">
              <PieChartComponent data={chartData} height={200} />
            </View>
          </View>
        </View>


        {/* <View className="flex-row gap-3 ">
        <FilterButton name="Все" isActive={filterBtn === "all"} onClick={() => setFilterBtn("all")} />
        <FilterButton name="Критичные" isActive={filterBtn === "critical"} onClick={() => setFilterBtn("critical")} />
        <FilterButton name="Важные" isActive={filterBtn === "important"} onClick={() => setFilterBtn("important")} />
        <FilterButton name="Плановые" isActive={filterBtn === "planned"} onClick={() => setFilterBtn("planned")} />
      </View> */}

        <View className="flex-row items-center gap-3 mb-4 ">
          {[{ name: "Заявки", value: "services" }, { name: "Аварии", value: "incident" }].map((btn, key) =>
            <Button key={key}
              onPress={() => setTypeTable(btn.value)}
              className="flex-1 !py-[1px]"
              styleColor={typeTable == btn.value ? "blue" : "grayOutline"}>
              {btn.name}
            </Button>
          )}
        </View>

        <View className="gap-2 mb-4">
          {typeTable === "services"
            ? services.map((item, key) => <RequestCard key={key} request={item} onClick={() => setIsPanel(true, item.id, item.status)} />)
            : incidents.map((item, key) => <IncidentCard key={key} incident={item} />)
          }
        </View>
      </ScrollView>

    </>
  )
})

export default DomainRegistryMapPage