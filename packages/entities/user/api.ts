import { User, UserRoutes } from "@/src/api/api-router"
import { authorizationInstance } from "@/src/api/instances/instance-authorization"

export const getUserById = (params: { id: number }) => {
    return authorizationInstance.get(UserRoutes.getById, { params })
}

export const getUserByCompany = (params: { id: number }) => {
    return authorizationInstance.get(UserRoutes.getCompany, { params })
}

export const getByUser = (params: { id: number }) => {
    return authorizationInstance.get(User.byOne, { params })
}

export const authoriseDespetcher = (params: { eMail: string, password: string, }) => {
    return authorizationInstance.post(User.authorise, params)
}