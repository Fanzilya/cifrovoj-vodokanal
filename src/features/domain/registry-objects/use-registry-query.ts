// useRegistryQuery.ts
import {
    checkObjectPlc,
    getOneObjectData,
} from "@/packages/entities/controll-block/api";
import {
    getAllObjects,
    getAllUserObjects,
    getTechnicalCharsShapshi,
} from "@/packages/entities/object/api";
import { PassportRegistryDataType } from "@/packages/entities/object/type";
import { Role } from "@/packages/entities/user/enums";
import { useQuery } from "@tanstack/react-query";

export const useRegistryQuery = (userId: number, role: Role) => {


    return useQuery({
        queryKey: ["registry", userId, role],
        queryFn: async (): Promise<PassportRegistryDataType[]> => {
            const [objectsRes] = await Promise.all([
                role === Role.Admin || role === Role.Ministry
                    ? getAllObjects()
                    : getAllUserObjects({ userId }),
                getTechnicalCharsShapshi(),
            ]);

            const objects = objectsRes.data;

            const objectDataResults = await Promise.all(
                objects.map(({ id }) => getOneObjectData({ id }))
            );

            return Promise.all(
                objects.map(async (obj) => {
                    const matched = objectDataResults.find((r) =>
                        r.data.some((el: any) => el.staticObjectInfoId === obj.id)
                    );

                    if (!matched) return { ...obj, plcList: [] };

                    const plcItems = matched.data.filter(
                        (el: any) => el.staticObjectInfoId === obj.id
                    );

                    const plcList = await Promise.all(
                        plcItems.map(async (plc) => {
                            try {
                                const res = await checkObjectPlc({
                                    plcIp: plc.plcIpAdress,
                                });

                                return {
                                    plcId: plc.id,
                                    plcName: plc.name,
                                    plcIpAdress: plc.plcIpAdress,
                                    status: res.data ?? false,
                                };
                            } catch {
                                return {
                                    plcId: plc.id,
                                    plcName: plc.name,
                                    plcIpAdress: plc.plcIpAdress,
                                    status: false,
                                };
                            }
                        })
                    );

                    return { ...obj, plcList };
                })
            );
        },
        staleTime: 60_000,
    });
};