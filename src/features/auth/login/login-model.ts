import { authoriseDespetcher } from "@/src/packages/entities/user/api";
import { Role } from "@/src/packages/entities/user/enums";
import { InitTriecoCompanyInterface, WaterCompany } from "@/src/packages/entities/water-company/types";
import { testEmail } from "@/src/packages/shared-ui/Inputs/setting/input-valid-email";
import { makeAutoObservable } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getWaterCompanyByUserId } from "@/src/packages/entities/water-company/api";
import { authAdmin, AuthEntity } from "./login-service";
import { STORAGE_KEYS } from "@/src/packages/features/user/user-god";

// Простой toast-интерфейс (замените на реальный, например, react-native-toast-message)
type ToastType = 'success' | 'error' | 'info';

const toast = {
    error: (msg: string) => console.log(`[Toast Error] ${msg}`),
    info: (msg: string) => console.log(`[Toast Info] ${msg}`),
};

class LoginModel {
    model: AuthEntity = { username: "", password: "" };
    validError: AuthEntity = { username: "", password: "" };

    isErrorStart: boolean = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    setEmail(value: string) {
        if (this.isErrorStart) this.validEmail(value);
        this.model.username = value;
    }

    validEmail(value: string) {
        this.validError.username = value.length === 0 ? "Поле пустое" : testEmail(value).errorTxt;
        return Boolean(this.validError.username);
    }

    setPassword(value: string) {
        if (this.isErrorStart) this.validPassword(value);
        this.model.password = value;
    }

    validPassword(value: string) {
        this.validError.password = value.length === 0 ? "Поле пустое" : "";
        return Boolean(this.validError.password);
    }

    get canSubmit() {
        const hasCredentials = Boolean(this.model.username?.trim()) && Boolean(this.model.password?.trim());
        return hasCredentials && !this.isLoading;
    }

    /**
     * Основной метод входа
     * @param setUser — из useAuth (через контекст)
     * @param initCompany — из useAuth
     * @param initTriecoCompany — из useAuth
     * @param navigation — передаётся из компонента (React Navigation)
     */
    async login(
        setUser: (data: any) => void,
        initCompany: (data: WaterCompany) => void,
        navigation: any // Типизируйте как: NavigationProp<RootStackParamList>
    ) {
        this.isLoading = true;

        try {
            if (this.model.username === "guest") {
                const response = await authAdmin({
                    username: "aovks",
                    password: "ffggrr",
                });

                await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.data.jwtToken);
                await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.data.refreshToken);
                await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, "99999");

                const companyResponse = await getWaterCompanyByUserId({ UserId: response.data.id });
                initCompany(companyResponse.data);

                setTimeout(() => {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'MenuModules' }], // Убедитесь, что имя маршрута есть в навигаторе
                    });
                }, 1000);

            } else {
                // Админ-логин для получения токена
                const adminResponse = await authAdmin({
                    username: 'aovks',
                    password: 'ffggrr',
                });

                await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, adminResponse.data.jwtToken);
                await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, adminResponse.data.refreshToken);
                await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, adminResponse.data.id);

                const companyResponse = await getWaterCompanyByUserId({ UserId: adminResponse.data.id });
                initCompany(companyResponse.data);

                // Пользовательский логин
                const userResponse = await authoriseDespetcher({
                    eMail: this.model.username,
                    password: this.model.password,
                });

                const authDate = new Date().toISOString();
                const user = {
                    ...userResponse.data,
                    id: userResponse.data.userId,
                    dateAuthConnect: authDate,
                };
                setUser(user);

                // Навигация в зависимости от роли
                switch (userResponse.data.baseRoleId) {
                    case Role.Client:
                        setTimeout(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'TrieoClient' }],
                            });
                        }, 1000);
                        break;

                    case Role.Sewer:
                    case Role.TransporterCompany:
                    case Role.Participant:
                    case Role.Ministry:
                    case Role.Admin:
                        setTimeout(() => {
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'MenuModules' }],
                            });
                        }, 1000);
                        break;

                    default:
                        toast.error("Неизвестная роль пользователя");
                }
            }
        } catch (error) {
            console.log("[Login Error]", error);
            toast.error("Неверный логин или пароль");
        } finally {
            this.isLoading = false;
        }
    }
}

export default new LoginModel();
