```markdown
# 40_widgets.md — Создание виджетов (widgets)

## Определение

**Виджет** — это самостоятельный блок интерфейса, который:
- Занимает часть страницы
- Содержит свою логику отображения
- Может иметь внутреннее состояние (UI-состояние)
- **НЕ управляет данными** (получает их через props)
- Переиспользуется на разных страницах

## Где создавать

```
packages/widgets/[widget-name]/
├── index.tsx              # Основной компонент
├── types.ts               # Типы пропсов (если много)
├── components/            # Локальные компоненты виджета
│   └── [subcomponent].tsx
└── utils.ts               # Локальные хелперы (опционально)
```

## Правила создания виджета

### 1. Виджет получает данные через props

✅ Правильно:
```tsx
interface WidgetProps {
  data: Order[]
  onSelect: (id: string) => void
}

export const OrderListWidget = ({ data, onSelect }: WidgetProps) => {
  return ( ... )
}
```

❌ Неправильно (виджет сам запрашивает данные):
```tsx
export const OrderListWidget = () => {
  const [data, setData] = useState([])
  
  useEffect(() => {
    fetchOrders() // ❌ Виджет не должен этого делать
  }, [])
}
```

### 2. Виджет может иметь UI-состояние

Виджет может управлять:
- Открыт/закрыт дропдаун
- Выбранная вкладка
- Состояние загрузки UI (скелетоны)
- Локальные фильтры (которые не влияют на страницу)

```tsx
export const TabsWidget = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0) // ✅ UI-состояние
  
  return ( ... )
}
```

### 3. Виджет не должен знать о роутинге

❌ Неправильно:
```tsx
const onPress = () => {
  router.push('/orders/123') // ❌ Виджет не знает о навигации
}
```

✅ Правильно (пробрасываем через props):
```tsx
interface WidgetProps {
  onItemPress: (id: string) => void
}

// На странице:
<OrderListWidget onItemPress={(id) => router.push(`/orders/${id}`)} />
```

### 4. Виджет собирает мелкие UI-компоненты

```tsx
// packages/widgets/order-card-widget/index.tsx
import { Card } from '@packages/shared-ui/card'
import { Button } from '@packages/shared-ui/button'
import { StatusBadge } from '@packages/shared-components/status-badge'

export const OrderCardWidget = ({ order, onPress }) => {
  return (
    <Card>
      <StatusBadge status={order.status} />
      <Button onPress={() => onPress(order.id)}>
        Подробнее
      </Button>
    </Card>
  )
}
```

### 5. Структура папки виджета

```
widgets/hardware-panel-tabs/          # Сложный виджет
├── index.ts                           # Экспорты
├── controlle.tsx                      # Основной компонент
├── review.tsx                          # Дополнительный компонент
├── serves.tsx                          # Дополнительный компонент
└── types.ts                            # Общие типы

widgets/order-card-widget/             # Простой виджет
├── index.tsx                           # Всё в одном файле
└── types.ts                             # Типы пропсов
```

### 6. Композиция виджетов

Виджеты могут использовать другие виджеты:
```tsx
// widgets/dashboard-widget/index.tsx
import { OrdersStatsWidget } from '@packages/widgets/orders-stats-widget'
import { RecentOrdersWidget } from '@packages/widgets/recent-orders-widget'

export const DashboardWidget = ({ data }) => {
  return (
    <View>
      <OrdersStatsWidget stats={data.stats} />
      <RecentOrdersWidget orders={data.recent} />
    </View>
  )
}
```

## Когда создавать виджет

✅ **Нужно создавать виджет если:**
- Блок используется на нескольких страницах
- Блок сложный (табы, панели, карточки с действиями)
- Хотите изолировать логику отображения

❌ **Не нужно создавать виджет если:**
- Это просто кнопка или инпут (используйте shared-ui)
- Компонент уникален для одной страницы (положите в `components/` рядом со страницей)
- Нет логики отображения (просто контейнер)

## Примеры виджетов из проекта

- `hardware-page-tabs/` — табы на странице оборудования
- `hardware-panel-tabs/` — панель с табами
- `object-passport/` — блок паспорта объекта
- `passport-statistics-panel/` — панель статистики

## Правило простое

**Виджет = "Как это выглядит" (получает данные)  
Страница/Фича = "Откуда взять данные и куда навигировать"**
```