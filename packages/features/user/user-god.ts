import { getByUser } from '@/packages/entities/user/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeAutoObservable } from 'mobx';
import { Role } from '../../entities/user/enums';
import { User, UserType } from '../../entities/user/type';
import { InitTriecoCompanyInterface, WaterCompany } from '../../entities/water-company/types';

export const STORAGE_KEYS = {
    USER: 'user',
    WATER_COMPANY: 'waterCompany',
    TRIECO_COMPANY: 'triecoCompany',
    JWT_TOKEN: 'jwtToken',
    REFRESH_TOKEN: 'refresh_token',
    ACCESS_TOKEN: 'refresh_token',
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

    // --- Getters ---
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

    // --- Initialization ---
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
        } catch (err) {
            console.error('Failed to load data from storage:', err);
            this.clearStorage();
        }
    }

    // --- Actions ---
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
        if (!token) {
            this._error = 'No token found';
            return;
        }

        const userIdStr = await AsyncStorage.getItem(STORAGE_KEYS.USER);
        if (!userIdStr) return;

        let userId: number;
        try {
            userId = JSON.parse(userIdStr).id;
        } catch {
            this._error = 'Invalid user ID';
            return;
        }

        this._isLoading = true;
        this._error = null;

        try {
            if (userId === 99999) {
                this.setUser({
                    id: 99999,
                    login: 'Guest',
                    firstName: 'Guest',
                    lastName: 'Guest',
                    patronymic: 'Guest',
                    email: 'Guest',
                    phoneNumber: 'Guest',
                    adress: 'Guest',
                    companyId: 99999,
                    roleId: Role.Guest,
                });
            } else {
                const userResp = await getByUser({ id: Number(userId) });
                this.setUser(userResp.data);
            }
        } catch (error) {
            this._error = 'Failed to load user data';
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
        // В React Native нет window.location — используйте навигацию
        // Например: navigation.reset(...) или глобальный навигатор
        // Пока просто оставим как заглушку
        // Совет: передавайте callback или используйте реакцию через стор
    }

    // --- Helpers ---
    private clearUser() {
        this._user = null;
        this._error = null;
        this.clearStorage();
    }

    private clearStorage() {
        const keys = Object.values(STORAGE_KEYS);
        AsyncStorage.multiRemove(keys).catch(err =>
            console.warn('Failed to clear storage:', err)
        );
    }

    getToken(): string | null {
        // В мобильном приложении токен может храниться по-разному
        // Здесь мы проверяем оба варианта
        const jwt = AsyncStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
        const refresh = AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        return jwt || refresh; // но лучше явно выбрать один источник
    }

    // Если нужно получить токен синхронно — нужно использовать async
    async getTokenAsync(): Promise<string | null> {
        const jwt = await AsyncStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
        if (jwt) return jwt;
        return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
}

// Экспортируем единственный экземпляр модели
export const userModel = new UserModel();
