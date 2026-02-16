export type RegistrationType = {
    organizationName: string;
    email: string;
    surname: string;
    name: string;
    patronymic: string;
    phone: string;
    inn: string;
    kpp: string;
    address: string;
    ogrn: string;
    municipal: string;
}

export type RegistrationProps = {
    show: boolean;
    onClose: () => void;
}