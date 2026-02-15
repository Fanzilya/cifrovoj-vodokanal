import { ControlBlock } from "@/src/api/api-router"
import { reserchInstance } from "@/src/api/instances"

export const getOneObjectData = (params: { id: number }) => {
    return reserchInstance.get(ControlBlock.getOne, { params })
}

export const checkObjectPlc = (params: { plcIp: string }) => {
    return reserchInstance.get(ControlBlock.checkPlc, { params })
}