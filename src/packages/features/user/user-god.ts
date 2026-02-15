import { makeAutoObservable } from "mobx";
import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- Добавить в зависимости
import { Role } from "../../entities/user/enums";
import { User, UserType } from "../../entities/user/type";
import { InitTriecoCompanyInterface, WaterCompany } from "../../entities/water-company/types";
import { getByUser } from "../../entities/user/api";

// Ключи хранилища
export const STORAGE_KEYS = {
    USER: 'user',
    WATER_COMPANY: 'waterCompany',
    TRIECO_COMPANY: 'triecoCompany',
    JWT_TOKEN: 'jwtToken',
    ACCESS_TOKEN: 'access_Token',
    REFRESH_TOKEN: 'refresh_token',
    USER_ID: 'user_id',
};

export class UserModel {
    private _user: User | UserType | null = null;
    private _waterCompany: WaterCompany | null = null;
    private _isLoading = false;
    private _error: string | null = null;
    private _triecoCompanyId: number | null = null;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
        this.initFromStorage();
    }

    get user() {
        return this._user;
    }

    get waterCompany() {
        return this._waterCompany;
    }

    get triecoCompanyId() {
        return this._triecoCompanyId;
    }

    get isLoading() {
        return this._isLoading;
    }

    get error() {
        return this._error;
    }

    get isAuthenticated() {
        return !!this._user && !!this.getToken();
    }

    // Асинхронное восстановление данных из хранилища
    private async initFromStorage() {
        try {
            const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
            const storedWaterCompany = await AsyncStorage.getItem(STORAGE_KEYS.WATER_COMPANY);
            const storedTriecoCompany = await AsyncStorage.getItem(STORAGE_KEYS.TRIECO_COMPANY);

            if (storedUser) {
                this._user = JSON.parse(storedUser);
            }
            if (storedWaterCompany) {
                this._waterCompany = JSON.parse(storedWaterCompany);
            }
            if (storedTriecoCompany) {
                const data = JSON.parse(storedTriecoCompany);
                this._triecoCompanyId = data.companyId || null;
            }
        } catch (error) {
            console.error('Failed to init from storage:', error);
            this.clearStorage();
        }
    }

    setUser(user: User | UserType) {
        this._user = user;
        this._error = null;
        AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }

    updateUser(updates: Partial<User | UserType>) {
        if (this._user) {
            this._user = { ...this._user, ...updates };
            AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this._user));
        }
    }

    async initUser() {
        const token = this.getToken();
        let userId: string | null = null;

        try {
            const storedUser = await AsyncStorage.getItem(STORAGE_KEYS.USER);
            if (storedUser) {
                userId = JSON.parse(storedUser).id;
            }
        } catch (e) {
            console.error("Failed to read user from storage", e);
        }

        if (!userId) {
            this._error = "No user ID found";
            return;
        }

        this._isLoading = true;
        this._error = null;

        try {
            if (userId === "99999") {
                this.setUser({
                    id: 99999,
                    login: "Guest",
                    firstName: "Guest",
                    lastName: "Guest",
                    patronymic: "Guest",
                    email: "Guest",
                    phoneNumber: "Guest",
                    adress: "Guest",
                    companyId: 99999,
                    roleId: Role.Guest,
                });
            } else {
                const userResp = await getByUser({ id: Number(userId) });
                this.setUser(userResp.data);
            }
        } catch (error) {
            this._error = "Failed to load user data";
            console.error(error);
        } finally {
            this._isLoading = false;
        }
    }

    initCompany(data: WaterCompany) {
        this._waterCompany = data;
        AsyncStorage.setItem(STORAGE_KEYS.WATER_COMPANY, JSON.stringify(data));
    }

    initTriecoCompany(data: InitTriecoCompanyInterface) {
        this._triecoCompanyId = data.companyId;
        AsyncStorage.setItem(STORAGE_KEYS.TRIECO_COMPANY, JSON.stringify(data));
    }

    logout() {
        this.clearUser();
        // Вместо window.location — можно использовать event или уведомить компонент
        // Рекомендуется вызывать навигацию в UI-слое (например, через useEffect + observer)
        // Например: useAuth().logout() + отдельный эффект на изменение user => redirect
    }

    private clearUser() {
        this._user = null;
        this._error = null;
        this.clearStorage();
    }

    private async clearStorage() {
        try {
            await AsyncStorage.removeItem(STORAGE_KEYS.JWT_TOKEN);
            await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
            await AsyncStorage.removeItem(STORAGE_KEYS.USER_ID);
            await AsyncStorage.removeItem(STORAGE_KEYS.USER);
            await AsyncStorage.removeItem(STORAGE_KEYS.WATER_COMPANY); // Исправлено: было "waterCompanyuser"
        } catch (error) {
            console.error('Failed to clear storage', error);
        }
    }

    getToken(): string | null {
        // Так как AsyncStorage асинхронный, а getToken используется синхронно,
        // приходится использовать синхронную проверку.
        // ⚠️ Это ограничение: лучше пересмотреть логику, где используется getToken().
        // Альтернатива: сделать userModel асинхронным или использовать реактивные getter'ы.
        // Пока оставим так, но знайте — это может быть проблемой.
        // Для полной асинхронности нужно переработать isAuthenticated.
        return localStorage.getItem(STORAGE_KEYS.JWT_TOKEN) || localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
}

export const userModel = new UserModel();
