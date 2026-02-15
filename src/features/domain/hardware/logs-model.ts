import { hardwaresLogs } from "@/packages/entities/hardware/api";
import { HardwareEventsDataType, StartEndDates } from "@/packages/entities/hardware/type";
import { sortHardwareEventsLogs } from "@/packages/functions/sort-data/sort-hardware-events-logs";
import { makeAutoObservable } from "mobx";

class LogsModel {
    logsList: HardwareEventsDataType[] = [];
    loader: boolean = false;
    hardwareId: number = 0;


    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    init(hardwareId: number, dateData: StartEndDates) {
        this.hardwareId = hardwareId;
        this.logsList = [];
        this.getLogs(dateData)
    }

    async getLogs({ start, end }: StartEndDates) {
        this.loader = true;
        const startDate = start instanceof Date ? start : new Date(start);
        const endDate = end instanceof Date ? end : new Date(end);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.error('Некорректные даты:', { start, end });
            throw new Error('Переданы некорректные даты');
        }

        try {
            const hardwaresLogsRes = await hardwaresLogs({
                hadrwareId: this.hardwareId,
                start: startDate,
                end: endDate,
            });

            this.logsList = sortHardwareEventsLogs(hardwaresLogsRes.data);
        } catch (error) {
            console.error('Ошибка загрузки logs:', error);
        } finally {
            this.loader = false;
        }

    }
}

export const logsModel = new LogsModel();