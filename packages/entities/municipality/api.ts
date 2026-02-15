import { MunicipalityRoutes } from "@/src/api/gis-api-routes"
import { instance } from "@/src/api/instances"

export const getAllMunicipalities = () => {
    return instance.get(MunicipalityRoutes.GetAll)
}