import { PieChartProps } from '@/src/entities/domain/registry-objects/type';
import React, { useMemo } from 'react';
import { View, Dimensions } from 'react-native';
import Svg, { Path, G, Text as SvgText } from 'react-native-svg';

interface SliceData {
    path: string;
    color: string;
    percentage: number;
    midAngle: number;
}

const PieChartComponent: React.FC<PieChartProps> = ({
    data,
    width = Dimensions.get('window').width - 100,
    height = 200
}) => {
    // Мемоизируем базовые вычисления
    const dimensions = useMemo(() => {
        const radius = Math.min(width, height) / 2.5;
        return {
            radius,
            centerX: width / 2,
            centerY: height / 2,
        };
    }, [width, height]);

    // Мемоизируем общую сумму
    const total = useMemo(() =>
        data.reduce((sum, item) => sum + item.value, 0),
        [data]
    );

    // Создаем все данные для сегментов в одном useMemo
    const slices = useMemo<SliceData[]>(() => {
        let currentAngle = 0;

        return data.map((item) => {
            const angle = (item.value / total) * 360;
            const endAngle = currentAngle + angle;
            const midAngle = currentAngle + angle / 2;

            // Конвертируем в радианы
            const startRad = (currentAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;

            // Вычисляем координаты для дуги
            const { centerX, centerY, radius } = dimensions;

            const x1 = centerX + radius * Math.sin(startRad);
            const y1 = centerY - radius * Math.cos(startRad);
            const x2 = centerX + radius * Math.sin(endRad);
            const y2 = centerY - radius * Math.cos(endRad);

            const largeArcFlag = angle > 180 ? 1 : 0;

            // Создаем path для сегмента
            const path = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
            ].join(' ');

            const percentage = Math.round((item.value / total) * 100);

            const sliceData: SliceData = {
                path,
                color: item.color,
                percentage,
                midAngle,
            };

            currentAngle = endAngle;
            return sliceData;
        });
    }, [data, total, dimensions]);

    // Мемоизируем метки отдельно (зависят от slices)
    const labels = useMemo(() => {
        const { centerX, centerY, radius } = dimensions;
        const labelRadius = radius * 0.7; // 70% от радиуса

        return slices.map((slice, index) => {
            const midRad = (slice.midAngle * Math.PI) / 180;

            const labelX = centerX + labelRadius * Math.sin(midRad);
            const labelY = centerY - labelRadius * Math.cos(midRad);

            return (
                <SvgText
                    key={`label-${index}`}
                    x={labelX}
                    y={labelY}
                    fill="white"
                    fontSize="12"
                    fontWeight="bold"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                >
                    {`${slice.percentage}%`}
                </SvgText>
            );
        });
    }, [slices, dimensions]);

    // Если нет данных, показываем пустой компонент
    if (data.length === 0 || total === 0) {
        return (
            <View style={{ width, height, alignItems: 'center', justifyContent: 'center' }}>
                <SvgText>Нет данных</SvgText>
            </View>
        );
    }

    return (
        <View style={{ alignItems: 'center' }}>
            <Svg width={width} height={height}>
                <G>
                    {/* Рендерим сегменты */}
                    {slices.map((slice, index) => (
                        <Path
                            key={`slice-${index}`}
                            d={slice.path}
                            fill={slice.color}
                            stroke="white"
                            strokeWidth={1.5}
                        />
                    ))}

                    {/* Рендерим метки */}
                    {labels}
                </G>
            </Svg>
        </View>
    );
};

export default React.memo(PieChartComponent);