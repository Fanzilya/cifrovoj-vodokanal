import { EnginnerCancelPlanedServicesStageInterface, EnginnerCompletePlanedServicesStageInterface } from "@/packages/entities/planed-services/type";
import { useState } from "react";
import { CancelStageType, CompleteCommonStageType, CompleteEngineerStageType, ServiceStageType } from "../../../entities/service-requests/type";
import { useAuth } from "../../../entities/user/context";
import { getDostup, isJobRole } from "../../../entities/user/utils";
import { getDate } from "../../../functions/get-data/get-date";
import { Button } from "../../../shared-ui/button/button";
import { InputContainer } from "../../../shared-ui/Inputs/input-container";
import { Textarea } from "../../../shared-ui/textarea";
import { Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { StageFileList } from "./stage-file-list";


interface StageCardProps {
  stage: ServiceStageType,
  footerBlock?: boolean,
  number?: number,
  completeEngineer: (data: CompleteEngineerStageType) => void
  cancelEngineer: (data: CancelStageType) => void,
  completeCommon: (data: CompleteCommonStageType) => void
  completePlanetServiceEnginner: (data: EnginnerCompletePlanedServicesStageInterface) => void
  cancelPlanetServiceEngineer: (data: EnginnerCancelPlanedServicesStageInterface) => void
  // completePlanetServiceCommon: (data: SimpleCompletePlanedServicesInstructionInterface) => void
  serviceData?: any,
  switchShowFile: (id: number, value: boolean) => void
}

export const StageCard = ({ stage, footerBlock, number, completeEngineer, cancelEngineer, completeCommon, serviceData, completePlanetServiceEnginner, cancelPlanetServiceEngineer, switchShowFile }: StageCardProps) => {
  const isPlanedService = serviceData.type == "Тех. Обслуживание"

  const [descr, setDescr] = useState<string>("")
  const [isCanc, setIsCanc] = useState<boolean>(false)
  const [isCancComplete, setIsCancComplete] = useState<boolean>(false)

  const statusStage = { New: "Новый", Completed: "Завершен", Canceled: "Отменен" }
  const statusColorStage = { New: "bg-blue-500", Completed: "bg-green-500", Canceled: "bg-red-500" }
  const userDD = getDostup()

  const { user } = useAuth()

  const onComplete = () => {
    if (userDD.isCommandsEnabled) {
      setIsCancComplete(true)
    } else {
      // if (isPlanedService) {
      //   completePlanetServiceCommon({ stageId: Number(stage.id), discription: descr })
      // } else {
      completeCommon({ stageId: Number(stage.id), discription: descr })
      // }
    }
  }

  const NeedComplete = () => {
    if (isPlanedService) {
      completePlanetServiceEnginner({ stageId: Number(stage.id), engineerId: user.id, discription: descr })
    } else {
      completeEngineer({ stageId: Number(stage.id), engineerId: user.id, discription: descr })
    }
  }

  const needCancel = () => {
    if (isPlanedService) {
      cancelPlanetServiceEngineer({ stageId: stage.id, cancelDiscriprion: descr })
    } else {
      cancelEngineer({ stageId: stage.id, cancelDiscriprion: descr })
    }
  }

  const defultBack = () => {
    setDescr("")
    setIsCanc(false)
    setIsCancComplete(false)
  }

  const userIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`;
  const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;


  return (
    <View className="mb-4 bg-white rounded-xl shadow-sm border border-gray-200">
      <View className="p-4 border-b rounded-xl border-gray-100 bg-gray-50">
        <View className="flex flex-row items-center justify-between gap-3">
          <Text className="font-bold text-gray-800">Этап {number}</Text>
          <View className={`px-2 py-1 rounded-lg ${statusColorStage[stage?.currentStatus]}`}>
            <Text className="text-white">{statusStage[stage?.currentStatus]}</Text>
          </View>
        </View>
      </View>

      <View className="p-4">
        <View className="flex flex-row gap-4 mb-4">
          <View className="flex-1">
            <Text className="text-xs text-gray-500 uppercase tracking-wide mb-1">Создано</Text>
            <Text className="text-gray-800 font-medium">{getDate(stage.createdAt)}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xs text-gray-500 uppercase tracking-wide mb-1">Завершено</Text>
            <Text className="text-gray-800 font-medium">
              {getDate(stage.closedAt) !== "01.01.1, 00:00" ? getDate(stage.closedAt) : '—'}
            </Text>
          </View>
        </View>

        <View className="space-y-4">
          <View className="flex flex-row">
            <View className="flex-1 flex-row items-center gap-3 text-xs">
              <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center">
                <SvgXml xml={userIcon} width="16" height="16" className="text-blue-600" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 uppercase tracking-wide">Создатель</Text>
                <Text className="font-medium text-gray-800 truncate">{stage.creator ? stage.creator : "—"}</Text>
              </View>
            </View>

            {stage.creatorsCompany && (
              <View className="flex-1 flex-row items-center gap-3 text-xs">
                <View className="flex-1">
                  <Text className="text-gray-500 uppercase tracking-wide">Компания</Text>
                  <Text className="font-medium text-gray-800 truncate">{stage.creatorsCompany.companyName}</Text>
                </View>
              </View>
            )}
          </View>

          <View className="flex flex-row">
            <View className="flex-1 flex-row items-center gap-3 text-xs">
              <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center">
                <SvgXml xml={checkIcon} width="16" height="16" className="text-green-600" />
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500 uppercase tracking-wide">Исполнитель</Text>
                <Text className="font-medium text-gray-800 truncate">{stage.implementer ? stage.implementer : "—"}</Text>
              </View>
            </View>

            {stage.implementersCompany && (
              <View className="flex-1 flex-row items-center gap-3 text-xs">
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 uppercase tracking-wide">Компания</Text>
                  <Text className="font-medium text-gray-800 truncate">{stage.implementersCompany.companyName}</Text>
                </View>
              </View>
            )}
          </View>

          <View className="mt-5 pt-4 border-t border-gray-500">
            <Text className="mb-1 text-gray-600">
              {stage.stageType == "Общий" ? "Описание:" : "Требования к поставке"}
            </Text>
            <Text className="text-gray-800">{stage.discription}</Text>
          </View>

          {(stage.cancelDiscription?.length > 0 && stage.cancelDiscription !== "None") && (
            <View className="mt-4 p-3 bg-red-50 rounded-lg border border-red-100">
              <Text className="text-xs text-red-700 uppercase tracking-wide mb-1">Причина отмены</Text>
              <Text className="text-red-800 text-sm">{stage.cancelDiscription}</Text>
            </View>
          )}

          {stage.files.length > 0 && (
            <StageFileList
              files={stage.files}
              onAction={(id) => switchShowFile(id, true)}
            />
          )}
        </View>

        {stage.currentStatus === "New" && isCanc && (
          <View className="mt-5">
            <InputContainer headerText="Описание">
              <Textarea
                placeholder="Описание..."
                value={descr}
                onChange={setDescr}
                className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2"
              />
            </InputContainer>
          </View>
        )}

        {stage.currentStatus === "New" && isCancComplete && (
          <View className="mt-5">
            <InputContainer headerText="Описание">
              <Textarea
                placeholder="Описание..."
                value={descr}
                onChange={setDescr}
                className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2"
              />
            </InputContainer>
          </View>
        )}
      </View>

      {footerBlock && stage.currentStatus === "New" && (
        <View className="p-4 border-t border-gray-100 bg-gray-50">
          <View className="flex flex-row gap-2">
            {isJobRole() && ((isCanc || isCancComplete) ? (
              <>
                {isCancComplete && (
                  <>
                    <Button
                      onPress={NeedComplete}
                      className="flex-1 py-2.5 px-4 bg-green-500 rounded-lg"
                    >
                      <Text className="text-white font-medium text-center">Подтвердить</Text>
                    </Button>
                    <Button
                      onPress={defultBack}
                      className="flex-1 py-2.5 px-4 border border-green-500 rounded-lg"
                    >
                      <Text className="text-green-500 font-medium text-center">Отмена</Text>
                    </Button>
                  </>
                )}

                {isCanc && (
                  <>
                    <Button
                      onPress={needCancel}
                      className="flex-1 py-2.5 px-4 bg-red-500 rounded-lg"
                    >
                      <Text className="text-white font-medium text-center">Подтвердить</Text>
                    </Button>
                    <Button
                      onPress={defultBack}
                      className="flex-1 py-2.5 px-4 border border-red-500 rounded-lg"
                    >
                      <Text className="text-red-500 font-medium text-center">Отмена</Text>
                    </Button>
                  </>
                )}
              </>
            ) : (
              <>
                <Button
                  onPress={onComplete}
                  className="flex-2 py-2.5 px-4 bg-custom-accent rounded-lg"
                >
                  <Text className="text-white font-medium text-center">Завершить этап</Text>
                </Button>

                <Button
                  onPress={() => setIsCanc(true)}
                  className="flex-2 py-2.5 px-4 bg-red-500 rounded-lg"
                >
                  <Text className="text-white font-medium text-center">Отменить этап</Text>
                </Button>
              </>
            ))}
          </View>
        </View>
      )}
    </View>

  );
};