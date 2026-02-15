import { OrderRoutes, UserRoutes } from "@/src/api/gis-api-routes"
import { instance } from "@/src/api/instances"

export const getAllOrders = () => {
    return instance.get(OrderRoutes.GetAll)
}

export const getOrdersByIdWaterCompany = (params: GetOrderWaterCompanyId) => {
    return instance.get(OrderRoutes.GetByIdWaterCompany, { params })
}

export const getOrdersByIdCompany = (params: GetOrderCompanyId) => {
    return instance.get(OrderRoutes.GetByCompanyId, { params })
}

export const getOrderCustomer = (params: GetOrderCustomerRequest) => {
    return instance.get(UserRoutes.GetById, { params })
}