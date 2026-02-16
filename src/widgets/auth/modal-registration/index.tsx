import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { Input } from "@/packages/shared-ui/Inputs/input-text";
import { Modal } from "@/packages/shared-ui/modal/modal";
import { Button } from "@/packages/shared-ui/button/button";
import { InputContainer } from "@/packages/shared-ui/Inputs/input-container";
import { registrationModel } from "@/src/features/auth/registration/registration-model";

interface RegistrationModalProps {
    show: boolean;
    onClose: () => void;
};

export const Registration = observer(({ show, onClose }: RegistrationModalProps) => {
    const {
        model,
        isLoading,
        canSubmit,
        submitRegistration,
        reset,
        setOrganizationName,
        setEmail,
        setSurname,
        setName,
        setPatronymic,
        setPhone,
        setInn,
        setKpp,
        setAddress,
        setOgrn,
        setMunicipal,
    } = registrationModel;


    const handleSubmit = () => {
        // if (canSubmit()) {
        //   submitRegistration(
        //     () => {
        //       reset();
        //       onClose();
        //     },
        //     (error) => {
        //       console.error("Registration error:", error);
        //     }
        //   );
        // }
    };

    const handleCancel = () => {
        // reset();
        onClose();
    };

    return (
        <Modal
            wrapperId="register"
            type="right"
            show={show}
            setShow={onClose}
            title="Заявка на регистрацию в системе"
            classNames={{
                panel: "w-full max-w-md mx-auto",
                footer: "bg-gray-50 p-4 border-t border-gray-200",
            }}
            children={
                <View className="flex flex-col gap-4 p-4">
                    {/* Наименование организации */}
                    <InputContainer
                        classNames={{ wrapper: "w-full", header: "text-sm font-medium text-gray-700 mb-2" }}
                        headerText="Наименование организации"
                        isRequired
                    >
                        <Input
                            placeholder="Введите наименование организации"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                            value={model.organizationName}
                            onChange={setOrganizationName}
                            disabled={isLoading}
                        />
                    </InputContainer>

                    {/* Электронная почта */}
                    <InputContainer
                        classNames={{ wrapper: "w-full", header: "text-sm font-medium text-gray-700 mb-2" }}
                        headerText="Электронная почта"
                        isRequired
                    >
                        <Input
                            placeholder="Введите электронную почту"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                            value={model.email}
                            onChange={setEmail}
                            disabled={isLoading}
                        />
                    </InputContainer>

                    {/* ФИО */}
                    <View className="flex flex-col md:flex-row gap-4">
                        <InputContainer
                            classNames={{ wrapper: "flex-1", header: "text-sm font-medium text-gray-700 mb-2" }}
                            headerText="Фамилия"
                            isRequired
                        >
                            <Input
                                placeholder="Фамилия"
                                className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                                value={model.surname}
                                onChange={setSurname}
                                disabled={isLoading}
                            />
                        </InputContainer>

                        <InputContainer
                            classNames={{ wrapper: "flex-1", header: "text-sm font-medium text-gray-700 mb-2" }}
                            headerText="Имя"
                            isRequired
                        >
                            <Input
                                placeholder="Имя"
                                className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                                value={model.name}
                                onChange={setName}
                                disabled={isLoading}
                            />
                        </InputContainer>

                        <InputContainer
                            classNames={{ wrapper: "flex-1", header: "text-sm font-medium text-gray-700 mb-2" }}
                            headerText="Отчество"
                            isRequired
                        >
                            <Input
                                placeholder="Отчество"
                                className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                                value={model.patronymic}
                                onChange={setPatronymic}
                                disabled={isLoading}
                            />
                        </InputContainer>
                    </View>

                    {/* Телефон */}
                    <InputContainer
                        classNames={{ wrapper: "w-full", header: "text-sm font-medium text-gray-700 mb-2" }}
                        headerText="Контактный телефон"
                        isRequired
                    >
                        <Input
                            placeholder="+7 (___) ___-__-__"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                            value={model.phone}
                            onChange={(value) => setPhone(value)}
                            disabled={isLoading}
                        />
                    </InputContainer>

                    {/* ИНН / КПП */}
                    <View className="flex flex-col md:flex-row gap-4">
                        <InputContainer
                            classNames={{ wrapper: "flex-1", header: "text-sm font-medium text-gray-700 mb-2" }}
                            headerText="ИНН"
                            isRequired
                        >
                            <Input
                                placeholder="1234567890"
                                className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                                value={model.inn}
                                onChange={(value) => {
                                    const digitsOnly = value.replace(/\D/g, "").substring(0, 10);
                                    setInn(digitsOnly);
                                }}
                                disabled={isLoading}
                            />
                        </InputContainer>

                        <InputContainer
                            classNames={{ wrapper: "flex-1", header: "text-sm font-medium text-gray-700 mb-2" }}
                            headerText="КПП"
                            isRequired
                        >
                            <Input
                                placeholder="123456789"
                                className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                                value={model.kpp}
                                onChange={(value) => {
                                    const digitsOnly = value.replace(/\D/g, "").substring(0, 9);
                                    setKpp(digitsOnly);
                                }}
                                disabled={isLoading}
                            />
                        </InputContainer>
                    </View>

                    {/* Адрес */}
                    <InputContainer
                        classNames={{ wrapper: "w-full", header: "text-sm font-medium text-gray-700 mb-2" }}
                        headerText="Адрес"
                        isRequired
                    >
                        <Input
                            placeholder="420000, г. Казань, ул. Баумана, д. 25"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                            value={model.address}
                            onChange={setAddress}
                            disabled={isLoading}
                        />
                    </InputContainer>

                    {/* ОГРН */}
                    <InputContainer
                        classNames={{ wrapper: "w-full", header: "text-sm font-medium text-gray-700 mb-2" }}
                        headerText="ОГРН"
                        isRequired
                    >
                        <Input
                            placeholder="ОГРН"
                            className="border border-gray-300 px-4 py-3 rounded-lg text-gray-900"
                            value={model.ogrn}
                            onChange={setOgrn}
                            disabled={isLoading}
                        />
                    </InputContainer>

                    {/* Муниципальное образование (закомментировано как в оригинале) */}
                    {/* 
          <InputContainer
            classNames={{ wrapper: "w-full", header: "text-sm font-medium text-gray-700 mb-2" }}
            headerText="Муниципальное образование"
            isRequired
          >
            <Selector
              data={[]} // передайте реальные данные
              onSelect={handleSelectMunicipalFormation}
              placeholder="Выберите муниципалитет"
              disabled={isLoading}
            />
          </InputContainer> 
          */}
                </View>
            }
            footerSlot={
                <View className="flex flex-col sm:flex-row gap-3">
                    <Button
                        styleColor="blue"
                        className="flex-1"
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        Отправить заявку
                    </Button>
                    <Button
                        styleColor="blueOutline"
                        className="flex-1"
                        onPress={handleCancel}
                        disabled={isLoading}
                    >
                        Отменить
                    </Button>
                </View>
            }
        />
    );
});