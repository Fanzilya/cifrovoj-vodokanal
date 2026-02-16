import { RegistrationType } from "@/src/entities/auth/registration/type";
import { makeAutoObservable, runInAction } from "mobx";

export class RegistrationModel {
    model: RegistrationType = {
        organizationName: "",
        email: "",
        surname: "",
        name: "",
        patronymic: "",
        phone: "",
        inn: "",
        kpp: "",
        address: "",
        ogrn: "",
        municipal: "",
    };

    validationErrors: Partial<Record<keyof RegistrationType, string>> = {};
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }

    // === Setters ===
    setOrganizationName(value: string) {
        this.model.organizationName = value;
    }

    setEmail(value: string) {
        this.model.email = value;
    }

    setSurname(value: string) {
        this.model.surname = value;
    }

    setName(value: string) {
        this.model.name = value;
    }

    setPatronymic(value: string) {
        this.model.patronymic = value;
    }

    setPhone(value: string) {
        this.model.phone = value;
    }

    setInn(value: string) {
        this.model.inn = value;
    }

    setKpp(value: string) {
        this.model.kpp = value;
    }

    setAddress(value: string) {
        this.model.address = value;
    }

    setOgrn(value: string) {
        this.model.ogrn = value;
    }

    setMunicipal(value: string) {
        this.model.municipal = value;
    }

    // === Валидация полей ===
    validOrganizationName(value: string) {
        if (!value.trim()) {
            this.validationErrors.organizationName = "Введите наименование организации";
        } else {
            delete this.validationErrors.organizationName;
        }
    }

    validEmail(value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
            this.validationErrors.email = "Введите электронную почту";
        } else if (!emailRegex.test(value)) {
            this.validationErrors.email = "Некорректный формат email";
        } else {
            delete this.validationErrors.email;
        }
    }

    validSurname(value: string) {
        if (!value.trim()) {
            this.validationErrors.surname = "Введите фамилию";
        } else {
            delete this.validationErrors.surname;
        }
    }

    validName(value: string) {
        if (!value.trim()) {
            this.validationErrors.name = "Введите имя";
        } else {
            delete this.validationErrors.name;
        }
    }

    validPatronymic(value: string) {
        // Отчество может быть необязательным — проверка по желанию
        // if (!value.trim()) {
        //   this.validationErrors.patronymic = "Введите отчество";
        // } else {
        delete this.validationErrors.patronymic;
        // }
    }

    validPhone(value: string) {
        const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
        if (!value.trim()) {
            this.validationErrors.phone = "Введите телефон";
        } else if (!phoneRegex.test(value)) {
            this.validationErrors.phone = "Формат: +7 (XXX) XXX-XX-XX";
        } else {
            delete this.validationErrors.phone;
        }
    }

    validInn(value: string) {
        if (value.length !== 10 || !/^\d+$/.test(value)) {
            this.validationErrors.inn = "ИНН должен содержать 10 цифр";
        } else {
            delete this.validationErrors.inn;
        }
    }

    validKpp(value: string) {
        if (value.length !== 9 || !/^\d+$/.test(value)) {
            this.validationErrors.kpp = "КПП должен содержать 9 цифр";
        } else {
            delete this.validationErrors.kpp;
        }
    }

    validAddress(value: string) {
        if (!value.trim()) {
            this.validationErrors.address = "Введите адрес";
        } else {
            delete this.validationErrors.address;
        }
    }

    validOgrn(value: string) {
        if (!value.trim()) {
            this.validationErrors.ogrn = "Введите ОГРН";
        } else {
            delete this.validationErrors.ogrn;
        }
    }

    validMunicipal(value: string) {
        if (!value.trim()) {
            this.validationErrors.municipal = "Выберите муниципалитет";
        } else {
            delete this.validationErrors.municipal;
        }
    }

    // === Проверка возможности отправки ===
    canSubmit(): boolean {
        this.validateAll();

        return Object.keys(this.validationErrors).length === 0;
    }

    validateAll() {
        this.validOrganizationName(this.model.organizationName);
        this.validEmail(this.model.email);
        this.validSurname(this.model.surname);
        this.validName(this.model.name);
        this.validPhone(this.model.phone);
        this.validInn(this.model.inn);
        this.validKpp(this.model.kpp);
        this.validAddress(this.model.address);
        this.validOgrn(this.model.ogrn);
        // this.validMunicipal(this.model.municipal); // раскомментировать, если поле обязательно
        this.validPatronymic(this.model.patronymic);
    }

    // === Отправка формы ===
    async submitRegistration(
        onSuccess?: () => void,
        onError?: (error: any) => void
    ) {
        if (!this.canSubmit()) return;

        runInAction(() => {
            this.isLoading = true;
        });

        try {
            // TODO: Раскомментировать после реализации сервиса
            // await registrationService.register(this.model);

            // Имитация задержки (для тестирования интерфейса)
            await new Promise((resolve) => setTimeout(resolve, 1500));

            runInAction(() => {
                this.isLoading = false;
            });

            onSuccess?.();
        } catch (error) {
            runInAction(() => {
                this.isLoading = false;
            });
            onError?.(error);
        }
    }

    // === Сброс формы ===
    reset() {
        this.model = {
            organizationName: "",
            email: "",
            surname: "",
            name: "",
            patronymic: "",
            phone: "",
            inn: "",
            kpp: "",
            address: "",
            ogrn: "",
            municipal: "",
        };
        this.validationErrors = {};
        this.isLoading = false;
    }
}

export const registrationModel = new RegistrationModel();
