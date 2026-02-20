```markdown
# 50_shared.md — Shared-слой (переиспользуемые компоненты)

## Общая структура shared-слоя

```
packages/
├── shared-ui/           # Примитивные UI-компоненты
│   ├── button/
│   ├── input/
│   ├── modal/
│   └── ...
├── shared-components/   # Сложные составные компоненты
│   ├── header/
│   ├── breadcrumbs/
│   ├── stage-card/
│   └── ...
└── functions/          # Чистые функции-хелперы
    ├── get-data/
    ├── is-value/
    └── ...
```

## 1. shared-ui (примитивы)

**Назначение:** Атомарные компоненты интерфейса (кнопки, инпуты, модалки)

**Правила:**
- Один компонент = одна папка
- Компонент НЕ знает о бизнес-логике
- Компонент НЕ делает запросов
- Компонент принимает данные через props
- Компонент возвращает события через props (onChange, onPress)
- Минимальная зависимость от контекста приложения
- Полная типизация props
- Наличие дефолтных стилей (через Tailwind)

**Структура папки:**
```
shared-ui/[component-name]/
├── index.tsx           # Компонент
├── types.ts            # Типы пропсов (если много)
└── styles.ts           # Стили (если не Tailwind)
```

**Пример использования:**
```tsx
// Правильно
<Button 
  title="Сохранить"
  variant="primary"
  onPress={handleSave}
  disabled={loading}
/>

// Неправильно
<Button onClick={() => orderStore.save()} /> // store внутри компонента
```

## 2. shared-components (сложные компоненты)

**Назначение:** Крупные переиспользуемые блоки (шапка, хлебные крошки, карточки)

**Правила:**
- Могут содержать свою простую логику (открыть/закрыть, переключить таб)
- Могут использовать shared-ui компоненты
- НЕ содержат бизнес-логику (не работают со сторами)
- НЕ делают запросы к API
- Получают данные через props
- Отдают события через props
- Должны быть самодостаточными

**Структура папки:**
```
shared-components/[component-name]/
├── index.tsx           # Основной компонент
├── components/         # Локальные подкомпоненты
├── types.ts            # Типы
└── data.ts             # Статические данные (если нужны)
```

**Что должно быть в shared-components:**
- Хлебные крошки (Breadcrumbs)
- Шапка (Header)
- Карточки (Card)
- Панели вкладок (Tabs)
- Блоки с фильтрами
- Модалки с формой (без логики сохранения)

## 3. functions (хелперы)

**Назначение:** Чистые функции для форматирования, валидации, сортировки

**Правила:**
- Чистые функции (одинаковый вход = одинаковый выход)
- Нет сайд-эффектов
- Нет работы с API
- Нет работы со сторами
- Могут использоваться в любом месте
- Полное покрытие типами

**Структура:**
```
functions/[category]/
├── [function-name].ts
└── index.ts
```

**Категории:**
- `get-data/` — функции получения/форматирования данных
- `is-value/` — функции-проверки (type guards)
- `sort-data/` — сортировка
- `validate/` — валидация

**Пример:**
```ts
// get-date.ts
export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('ru-RU')
}

// is-stage-types.ts
export const isStageCompleted = (stage: Stage): boolean => {
  return stage.status === 'completed'
}
```

## 4. Иерархия использования

```
shared-functions → shared-ui → shared-components → (features/entities/widgets)
```

- functions могут использовать только другие functions
- shared-ui могут использовать functions
- shared-components могут использовать shared-ui и functions
- Никто не импортирует в shared с верхних слоев

## 5. Правила создания нового компонента

**Перед созданием:**
1. Проверить, нет ли похожего компонента в shared-ui или shared-components
2. Проверить, точно ли компонент переиспользуемый (используется минимум в 2х местах)
3. Определить уровень: примитив или сложный компонент

**В процессе создания:**
1. Компонент не должен знать, где его используют
2. Все тексты выносить в props (никаких захардкоженных строк)
3. Все стили через className (Tailwind)
4. Полная типизация
5. Экспорт по умолчанию (default export) из index.tsx

**После создания:**
1. Проверить импорты (не использовать алиасы верхних слоев)
2. Проверить, что компонент не тянет лишнего

## 6. Запреты

❌ **НЕЛЬЗЯ в shared:**
- Импортировать из `@/features`, `@/app`, `@/widgets`
- Использовать MobX сторы
- Делать API запросы
- Использовать хуки роутинга (useRouter, useParams)
- Использовать контекст авторизации
- Использовать глобальные стейты

✅ **МОЖНО:**
- Использовать локальный useState (для UI-логики)
- Использовать useEffect (для работы с DOM/анимациями)
- Использовать контекст темы/дизайн-системы
- Использовать хуки из React Native

## 7. Примеры границ

**Плохо (нарушение):**
```tsx
// shared-ui/order-card/index.tsx
import { orderStore } from '@packages/entities/order' // НЕТ! entities выше

export const OrderCard = () => {
  const orders = orderStore.orders // НЕТ! store внутри
  return <View>{orders.map(...)}</View>
}
```

**Хорошо:**
```tsx
// shared-ui/card/index.tsx
import { ReactNode } from 'react'

interface CardProps {
  title: string
  children: ReactNode
  onPress?: () => void
}

export const Card = ({ title, children, onPress }: CardProps) => {
  return (
    <View className="p-4 bg-white rounded-lg">
      <Text className="text-lg font-bold">{title}</Text>
      {children}
    </View>
  )
}
```

## 8. Рефакторинг существующего кода

Если нашли код, который должен быть в shared:
1. Создать компонент в правильной папке
2. Перенести логику
3. Импортировать новый компонент в старое место
4. Старый код не удалять (пока), пометить как deprecated

## 9. Ключевые принципы

- **Single Responsibility** — компонент делает только одну вещь
- **Dumb components** — умная логика снаружи, тупые компоненты внутри
- **DRY** — не дублировать код, выносить в shared
- **Composition** — собирать сложное из простого
```