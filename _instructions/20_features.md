# 20_features.md — Бизнес-логика и модели (features)

## Где создавать features

Новую сущность создаем в `packages/entities/[entity-name]/`

*/features/
├── [module-name]/
│ ├── [page-name]-model.ts      # MobX store для страницы
│ ├── [page-name]-form-model.ts # MobX store для страницы c формами
│ ├── data.ts                   # данные для постройки страницы. К примеру список данных для фильтра, для табов переключения
```

### 2. Глобальные features (общие между модулями)
```
packages/features/
├── [feature-name]/
│   ├── model.ts              # MobX store
│   ├── api.ts                 # Специфичные запросы
│   ├── types.ts               # Типы фичи
│   └── index.ts               # Публичное API
└── index.ts                   # Экспорты всех фич
```

## Что хранить в features

- **MobX сторы** страниц и модулей
- **Бизнес-логику** (валидация, вычисления, трансформации)
- **Специфичные запросы** к API (которые не относятся к конкретной сущности)
- **Компоненты**, реализующие конкретный пользовательский сценарий

## Правила создания

1. **Одна страница = один store** (если логика сложная)
2. **Store не хранит UI-состояние** (открытые модалки, выбранные табы — это в компоненте)
3. **Store не содержит JSX**
4. **Фича может использовать entities, но не наоборот**
5. **Глобальные фичи выносим в packages/features/**, локальные — в src/features/

## Структура store (MobX)

```typescript
class PageModel {
  // 1. Состояние (observable)
  data = []
  loading = false
  error = null
  selectedId = null

  // 2. Конструктор
  constructor() {
    makeAutoObservable(this)
  }

  // 3. Computed (геттеры)
  get filteredData() {}

  // 4. Actions (синхронные)
  setLoading = () => {}
  selectItem = () => {}

  // 5. Async actions
  loadData = async () => {}
}
```

## Когда создавать feature

✅ **Нужно создавать feature, когда:**
- Страница требует загрузки данных с API
- Есть сложная логика фильтрации/сортировки
- Нужно управлять состоянием формы
- Логика переиспользуется между страницами

❌ **Не нужно создавать feature, когда:**
- Данные уже есть в entities store
- Компонент просто отображает пропсы (это widget)
- Логика помещается в 3 строки внутри компонента

## Типы features

### 1. Page Model — для конкретной страницы
```
src/features/dispatcher/hardware-list-model.ts
```

### 2. Form Model — для сложных форм
```
src/features/dispatcher/incident-form-model.ts
```

### 3. Global Feature — общая логика
```
packages/features/notifications/model.ts
packages/features/permissions/model.ts
```

## Правила именования

| Тип | Формат | Пример |
|-----|--------|--------|
| Page Model | `[page-name]-model.ts` | `hardware-list-model.ts` |
| Form Model | `[form-name]-model.ts` | `create-request-model.ts` |
| Feature Store | `model.ts` | `model.ts` |
| Feature API | `api.ts` | `api.ts` |
| Feature Types | `types.ts` | `types.ts` |

## Зависимости

- **Локальный feature** может импортировать:
  - `@/src/features/*` (другие фичи этого модуля)
  - `@packages/entities/*`
  - `@packages/functions/*`
  - `@packages/shared-*`

- **Глобальный feature** может импортировать:
  - `@packages/entities/*`
  - `@packages/functions/*`
  - Другие глобальные фичи (только через index.ts)

## Запреты

❌ **В features нельзя:**
- Импортировать из `src/app/` (страницы)
- Хранить UI-компоненты (кроме компонентов фичи)
- Использовать навигационные хуки (`useRouter`, `usePathname`)
- Работать с localStorage/AsyncStorage напрямую (выносить в functions)
- Создавать циклические зависимости между фичами

## Проверка перед созданием

- [ ] Фича решает конкретную бизнес-задачу
- [ ] Определен тип (локальная/глобальная)
- [ ] Название соответствует формату
- [ ] Store не дублирует entities store
- [ ] API вызовы вынесены в отдельные методы
- [ ] Обработка ошибок и состояний загрузки
```