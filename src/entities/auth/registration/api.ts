import { UserRoutes } from "@/src/api/api-router";
import { instance } from "@/src/api/instances";
import { RegistrationType } from "./type";

export const register = (params: RegistrationType) => {
    return instance.post(UserRoutes.Create, params);
}