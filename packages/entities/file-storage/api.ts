import { Documents } from "@/src/api/api-router"
import { reserchInstance } from "@/src/api/instances"

export const objectDocumentUpload = (params: any) => {
    return reserchInstance.post(Documents.objectDocumentUpload, params)
}
export const objectDocumenAll = (params: { id: number }) => {
    return reserchInstance.get(Documents.objectDocumenAll, { params })
}
export const objectDocumentDelete = (params: { id: number }) => {
    return reserchInstance.delete(Documents.objectDocumentDelete, { params })
}
export const objectDocumentActive = (params: { id: number }) => {
    return reserchInstance.get(Documents.objectDocumentActive, { params })
}