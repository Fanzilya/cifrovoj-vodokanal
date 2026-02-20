import { makeAutoObservable } from "mobx";
import { getAllObjects, getAllUserObjects, getTechnicalCharsShapshi } from "@/packages/entities/object/api";
import { Role } from "@/packages/entities/user/enums";
import { PassportPlcDataType, PassportRegistryDataType } from "@/packages/entities/object/type";
import { checkObjectPlc, getOneObjectData } from "@/packages/entities/controll-block/api";

class RegistryModel {
    model: PassportRegistryDataType[] = [];
    isLoading: boolean = true;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    async init(userId: number, userRole: Role) {
        this.isLoading = true;
        try {
            // Загружаем объекты и технические характеристики
            const [objectsRes, charsShapshiRes] = await Promise.all([
                userRole === Role.Admin || userRole === Role.Ministry
                    ? getAllObjects()
                    : getAllUserObjects({ userId }),
                getTechnicalCharsShapshi(),
            ]);

            // Получаем данные по каждому объекту
            const results = await Promise.all(
                objectsRes.data.map(({ id }) => getOneObjectData({ id }))
            );

            // Формируем полные данные с проверкой подключения к ПЛК
            const fullDataPromises = objectsRes.data.map(async (obj) => {
                const matchedResult = results.find((element) =>
                    element.data.some((el: any) => el.staticObjectInfoId === obj.id)
                );

                let plcList: PassportPlcDataType[] = [];

                if (matchedResult) {
                    const plcItems = matchedResult.data.filter(
                        (el: any) => el.staticObjectInfoId === obj.id
                    );

                    const plcStatuses = await Promise.all(
                        plcItems.map(async (el) => {
                            try {
                                const info = await checkObjectPlc({ plcIp: el.plcIpAdress });
                                return {
                                    plcId: el.id,
                                    plcName: el.name,
                                    plcIpAdress: el.plcIpAdress,
                                    status: info.data ?? false,
                                };
                            } catch (error) {
                                return {
                                    plcId: el.id,
                                    plcName: el.name,
                                    plcIpAdress: el.plcIpAdress,
                                    status: false,
                                };
                            }
                        })
                    );

                    plcList = plcStatuses;
                }

                return {
                    ...obj,
                    plcList,
                };
            });

            const fullData: PassportRegistryDataType[] = await Promise.all(fullDataPromises);
            console.log(fullData)
            this.model = fullData;
        } catch (error) {
            console.error("Ошибка при инициализации реестра:", error);
            this.model = [];
        } finally {
            this.isLoading = false;
        }
    }
}

export const registryModel = new RegistryModel();
