export interface ChartData {
    name: string;
    value: number;
    color: string;
}

export interface PieChartProps {
    data: ChartData[];
    width?: number;
    height?: number;
}
