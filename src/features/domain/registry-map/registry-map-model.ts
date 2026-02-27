import { getInfoHardware } from "@/packages/entities/hardware/api";
import { getAllIncedent } from "@/packages/entities/incident/api";
import { Incident } from "@/packages/entities/incident/type";
import { getAllObjects, getAllUserObjects, getOneData } from "@/packages/entities/object/api";
import { CompletePlanedCommonServicesInterface } from "@/packages/entities/planed-services/type";
import { cancelServiceRequests, completeServiceRequests, getServiceRequestsAll } from "@/packages/entities/service-requests/api";
import { CompleteCancelType, ServiceType } from "@/packages/entities/service-requests/type";
import { getByUser } from "@/packages/entities/user/api";
import { Role } from "@/packages/entities/user/enums";
import { getCompanyUserRequest } from "@/packages/functions/get-data/get-company-user-request";
import { getGoodName } from "@/packages/functions/get-data/get-good-name";
import { isStageAnswerTypes, isStageIncidentTypes, isStageSupplyTypes } from "@/packages/functions/is-value/is-stage-types";
import { getSuggestionClick } from "@/packages/shared-ui/mapVK/mapVk-functions";
import { makeAutoObservable } from "mobx";
import Toast from 'react-native-toast-message';

class RegistryMapModel {
    services: ServiceType[] = [];
    incidents: Incident[] = [];
    isLoaded: boolean = true;

    showPanel: boolean = false
    showStagePanel: boolean = false

    focusIncedent: any = null
    focusService: any = null

    isPanel: boolean = false;
    serviceId: number = 0

    isService: { id: number, status: 'New' | 'Completed' | 'Canceled' | null } = { id: 0, status: null }

    chartData: { name: string, value: number, color: string }[] = []

    serviceStatusCounter: { new: number, complete: number, cancle: number } = { new: 0, complete: 0, cancle: 0 };
    serviceTypeCounter: { asnser: number, supply: number, incident: number } = { asnser: 0, supply: 0, incident: 0 };

    objectPoints: Array<{
        id: number;
        coordinates: [number, number];
        name: string;
    }> = [];

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }


    setShowPanel(value: boolean, incident: any) {
        this.focusIncedent = incident
        this.showPanel = value
    }

    setShowStagePanel(value: boolean, service: any) {
        this.focusService = service
        this.showStagePanel = value
    }


    setIsPanel(value: boolean, id = 0, status: 'New' | 'Completed' | 'Canceled' | null) {
        this.isPanel = value;
        this.isService = {
            id: id,
            status: status
        }
    }

    async init(userId: number, baseRoleId: Role) {
        try {
            this.isLoaded = true;
            this.initService()
            this.initIncident(userId, baseRoleId)
        } catch (error) {
            console.error('Ошибка инициализации сервисов:', error);
            throw error;
        } finally {
            this.isLoaded = false;
        }
    }

    async initService() {

        const serviceResponse = await getServiceRequestsAll();

        const results = [];
        const requestIdList: number[] = []

        for (const item of serviceResponse.data) {
            requestIdList.push(item.id)
            const enrichedItem = await getCompanyUserRequest(item);
            results.push({
                ...enrichedItem,
            });
        }

        this.services = results


        const statusCounter: { new: number, complete: number, cancle: number } = { new: 0, complete: 0, cancle: 0 };
        const typeCounter: { asnser: number, supply: number, incident: number } = { asnser: 0, supply: 0, incident: 0 };

        results.forEach(service => {
            // подсчёт по статусам
            if (service.status) {
                if (service.status === 'New') statusCounter.new++;
                if (service.status === 'Completed') statusCounter.complete++;
                if (service.status === 'Canceled') statusCounter.cancle++;
            }

            if (service.type) {
                if (isStageAnswerTypes(service.type)) typeCounter.asnser++
                if (isStageSupplyTypes(service.type)) typeCounter.supply++
                if (isStageIncidentTypes(service.type)) typeCounter.incident++
            }
        });

        this.serviceStatusCounter = statusCounter;
        this.serviceTypeCounter = typeCounter;

        this.chartData = [
            { name: 'Общие заявки', value: this.serviceTypeCounter.asnser, color: '#3F83F8' },
            { name: 'Поставочные заявки', value: this.serviceTypeCounter.supply, color: '#2DAF4F' },
            { name: 'Аварийные заявки', value: this.serviceTypeCounter.incident, color: '#EA4335' }
        ]
    }

    async initIncident(userId: number, baseRoleId: Role) {
        try {
            // 1. Загружаем объекты с обработкой ошибок
            const objectsRes = await Promise.allSettled([
                (baseRoleId === Role.Admin || baseRoleId === Role.Ministry)
                    ? getAllObjects()
                    : getAllUserObjects({ userId })
            ]);

            if (objectsRes[0].status === 'rejected') {
                throw new Error(`Ошибка загрузки объектов: ${objectsRes[0].reason}`);
            }

            const objects = objectsRes[0].value.data || [];

            if (objects.length === 0) {
                this.objectPoints = [];
                return;
            }

            // 2. Параллельно загружаем координаты для всех объектов
            const pointsPromises = objects.map(async (object) => {
                try {
                    const data = await getSuggestionClick(object.adress);
                    return {
                        id: object.id,
                        coordinates: data.pin,
                        name: object.name,
                        success: true
                    };
                } catch (error) {
                    console.error(`Ошибка загрузки координат для объекта ${object.id}:`, error);
                    return {
                        id: object.id,
                        coordinates: null,
                        name: object.name,
                        success: false,
                        error
                    };
                }
            });

            const pointsResults = await Promise.all(pointsPromises);

            // 3. Создаем массив только с успешными результатами
            const objectPoints: Array<{
                id: number;
                coordinates: [number, number];
                name: string;
            }> = [];

            pointsResults.forEach(result => {
                if (result.success && result.coordinates) {
                    objectPoints.push({
                        id: result.id,
                        coordinates: result.coordinates,
                        name: result.name
                    });
                }
            });

            this.objectPoints = objectPoints;

        } catch (error) {
            console.error('Ошибка в initIncident:', error);
            this.objectPoints = [];
        }



        const incidentResponse = await getAllIncedent();
        const incidents = incidentResponse.data ?? [];

        // 1. Собираем уникальные hardwareId и objectId за один проход
        const hardwareIds = new Set<number>();
        const objectIds = new Set<number>();

        for (const incident of incidents) {
            if (incident.hardwareId) {
                hardwareIds.add(incident.hardwareId);
            }
            if (incident.objectId) {
                objectIds.add(incident.objectId);
            }
        }

        // 2. Загружаем hardware
        const hardwareMap = new Map<number, string>();

        await Promise.all(
            Array.from(hardwareIds).map(async (hardwareId) => {
                try {
                    const res = await getInfoHardware({ id: hardwareId });
                    hardwareMap.set(
                        hardwareId,
                        res.data?.name ?? 'Неизвестно'
                    );
                } catch (e) {
                    console.error(`Ошибка загрузки hardware ${hardwareId}`, e);
                    hardwareMap.set(hardwareId, 'Ошибка загрузки');
                }
            })
        );

        // 3. Загружаем объекты (objectId может повторяться)
        const objectMap = new Map<number, any>();

        await Promise.all(
            Array.from(objectIds).map(async (objectId) => {
                try {
                    const res = await getOneData({ id: objectId });
                    objectMap.set(objectId, res.data ?? null);
                } catch (e) {
                    console.error(`Ошибка загрузки объекта ${objectId}`, e);
                    objectMap.set(objectId, null);
                }
            })
        );

        // 4. Обогащаем модель аварий
        this.incidents = incidents.map(incident => ({
            ...incident,
            hardwareName: incident.hardwareId
                ? hardwareMap.get(incident.hardwareId) ?? 'Неизвестно'
                : null,
            object: incident.objectId
                ? objectMap.get(incident.objectId) ?? null
                : null
        }));
    }

    async completeService(data: CompleteCancelType) {
        await completeServiceRequests(data)
            .then(() => {
                Toast.show({
                    type: 'success',
                    text1: 'Заявка успешно завершена',
                });
            })
            .catch(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Ошибка при завершении',
                });
            })
    }

    async cancelService(data: CompleteCancelType) {
        await cancelServiceRequests(data)
            .then(() => {

                Toast.show({
                    type: 'success',
                    text1: 'Заявка успешно отменена',
                });
            })
            .catch(() => {
                Toast.show({
                    type: 'error',
                    text1: 'Ошибка при отмене',
                });
            })
    }

    async completePlanedService(data: CompletePlanedCommonServicesInterface, onAction: () => void) {
        // await completePlanedCommonServiceApi(data)
        //     .then(() => {
        //         const requestId = data.requestId;
        //         const requestIndex = this.model.findIndex((item) => item.id === requestId);

        //         if (requestIndex !== -1) {
        //             this.model[requestIndex].status = "Completed";
        //         } else {
        //             console.warn(`Заявка с id=${requestId} не найдена`);
        //         }
        //         onAction(true)
        //         this.isService.status = "Completed";

        //         toast.success("Заявка успешно завершен", { progressStyle: { background: "green" } })
        //     })
        //     .catch((error) => {
        //         toast.error(error.response.data, { progressStyle: { background: "red" } })
        //     })
    }
}

export const registryMapModel = new RegistryMapModel();