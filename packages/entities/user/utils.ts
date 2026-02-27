import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "./context";
import { Role } from "./enums";

export const getRoleText = (role: number) => {
    switch (role) {
        case Role.Client:
            return "Клиент";
        case Role.Sewer:
            return "Ассенизатор";
        case Role.TransporterCompany:
            return "Траспортная компания";
        case Role.Participant:
            return "Участник";


        case Role.CompanyOperator:
            return "Перевозчик за триеко";
        case Role.WaterCompany:
            return "Водоканал";
        case Role.CompanytClient:
            return "Предприятие";
        case Role.Ministry:
            return "Министр";
        case Role.WaterCompanyOperator:
            return "Оператор водоканала";
        case Role.WaterCompany:
            return "Оператор очистного сооружения";
        case Role.WaterCompanyAdmin:
            return "Оператор очистного сооружения";
        case Role.TreatmentPlantOperator:
            return "Оператор очистного сооружения";
        case Role.Admin:
            return "Админ";
        case Role.Plant:
            return "Оператор ОС";
    }
}

export async function getDostup() {
    try {
        let data = await AsyncStorage.getItem("userDostup");
        if (data === null) return null;
        return JSON.parse(data);
    } catch (error) {
        console.error('Error getting dostup:', error);
        return null;
    }

}

export function isAdmin() {
    const { user } = useAuth()
    return user.baseRoleId === Role.Admin
}

export function isJobRole() {
    const { user } = useAuth()
    return user.baseRoleId === Role.Admin || user.baseRoleId === Role.Participant
}
