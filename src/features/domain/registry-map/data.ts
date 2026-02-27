// Моковые данные для примера
export const mockObjectPoints: ObjectPoint[] = [
    { id: "1", name: "Объект 1", coordinates: [49.349157, 55.858397] },
    { id: "2", name: "Объект 2", coordinates: [49.449157, 55.758397] },
];

export const mockIncidents = [{ id: 1 }, { id: 2 }, { id: 3 }];
export const mockServices = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

export const mockServiceStatusCounter: ServiceStatusCounter = {
    new: 12,
    complete: 45,
    cancle: 3,
};

export const mockChartData: ChartData[] = [
    { name: "Тип 1", value: 30, color: "#FF6B6B" },
    { name: "Тип 2", value: 45, color: "#4ECDC4" },
    { name: "Тип 3", value: 25, color: "#45B7D1" },
];
