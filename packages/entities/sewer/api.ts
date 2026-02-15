// export const getSewersByCompanyId = (params: SewersGetByCompanyRequest) => {
//     return instance.get(SewersRoutes.GetByCompanyId, { params })
// }

import { SewersRoutes } from "@/src/api/gis-api-routes"
import { instance } from "@/src/api/instances"
import { GetSewersCompanyId } from "./type"

// export const getSewersByUserId = (params: SewersGetByUserRequest) => {
//     return instance.get(SewersRoutes.GetByUserId, { params })
// }

export const getAllSewers = () => {
    return instance.get(SewersRoutes.GetAll)
}

export const getByWaterCompany = (params: GetSewersCompanyId) => {
    return instance.get(SewersRoutes.GetByIdWaterCompany, { params })
}

// export const createSewer = (data: CreateSewerRequest) => {
//     return instance.post(SewersRoutes.Create, data)
// }

// export const createSewerUser = (data: CreateSewerUserRequest) => {
//     return instance.post(UserRoutes.Create, data)
// }

// export const attachSewer = (data: AttachSewerRequest) => {
//     return instance.put(OrderRoutes.AttachSewer, data, { params: { OrderId: data.orderId } })
// }

