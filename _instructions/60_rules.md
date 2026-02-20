```markdown
# 60_rules.md — Правила работы с проектом

## Основные принципы

### 1. НЕ ломать существующий код
- **Запрещено** изменять существующие файлы без явного разрешения
- **Запрещено** удалять файлы
- **Запрещено** переименовывать файлы/папки
- **Запрещено** менять сигнатуры экспортируемых функций/компонентов
- **Разрешено** только дополнять новыми файлами

### 2. НЕ создавать дубликаты
Перед созданием нового файла:
- Проверить `packages/shared-ui/` — есть ли готовый UI-компонент
- Проверить `packages/entities/` — есть ли готовая сущность
- Проверить `packages/functions/` — есть ли готовая функция
- Проверить `src/features/` — есть ли готовая логика

### 3. Следовать архитектуре FSD
Импорты только сверху вниз:
- `app/` → всё
- `features/` → `entities/`, `shared/`
- `widgets/` → `features/`, `entities/`, `shared/`
- `entities/` → `shared/`
- `shared/` → ничего кроме `shared/`

### 4. Использовать алиасы (запрещены относительные пути)
❌ `../../../packages/shared-ui/button`
✅ `@packages/shared-ui/button`
✅ `@/features/dispatcher/model`

### 5. Типизация — обязательна
- Все файлы `.ts`/`.tsx` (никакого `.js`/`.jsx`)
- Все пропсы компонентов имеют `interface Props`
- Все API ответы имеют тип
- Все сторы типизированы

## Правила именования

### Папки (kebab-case)
```
✅ shared-ui
✅ design-tokens
✅ hardware-page-tabs
❌ sharedUI
❌ HardwarePageTabs
```

### Файлы (kebab-case)
```
✅ button.tsx
✅ input-text.tsx
✅ stage-supply-card.tsx
❌ Button.tsx
❌ inputText.tsx
```

### Компоненты (PascalCase)
```tsx
✅ export const Button = () => {}
✅ export const InputText = () => {}
❌ export const button = () => {}
```

### Функции/переменные (camelCase)
```ts
✅ const formatDate = () => {}
✅ const userStore = new UserStore()
❌ const FormatDate = () => {}
```

### Типы/интерфейсы (PascalCase)
```ts
✅ interface UserProps {}
✅ type OrderStatus = {}
❌ interface userProps {}
```

### Специальные файлы
- `index.tsx` — основной компонент папки
- `_layout.tsx` — роутинг
- `[param].tsx` — динамический роут
- `+not-found.tsx` — 404
- `*.model.ts` — MobX сторы
- `*.api.ts` — API запросы
- `*.types.ts` — типы (если много)

## Работа с git

### Перед коммитом проверить:
- [ ] `npm run typecheck` — нет ошибок типов
- [ ] `npm run lint` — нет ошибок линтера
- [ ] Нет закомментированного кода
- [ ] Нет `console.log`
- [ ] Нет `any` (кроме крайних случаев)

### Commit message
```
[тип] краткое описание

типы: feat, fix, refactor, docs, chore
пример: [feat] добавить страницу списка заказов
```

## Структура нового файла

### Компонент
```tsx
import { View } from 'react-native'
import { FC } from 'react'

interface Props {
  title: string
  onPress?: () => void
}

export const ComponentName: FC<Props> = ({ title, onPress }) => {
  return (
    <View>
      {/* логика */}
    </View>
  )
}
```

### MobX store
```ts
import { makeAutoObservable, runInAction } from 'mobx'

export class StoreName {
  // state
  data: Type[] = []
  loading = false

  constructor() {
    makeAutoObservable(this)
  }

  // actions
  setLoading = (state: boolean) => {
    this.loading = state
  }

  // async actions
  fetchData = async () => {
    this.setLoading(true)
    try {
      const data = await api.call()
      runInAction(() => {
        this.data = data
      })
    } finally {
      runInAction(() => {
        this.setLoading(false)
      })
    }
  }
}
```

## Запрещенные паттерны

❌ **Логика в компонентах** — выносить в features/entities
❌ **Запросы в компонентах** — выносить в api.ts
❌ **Магические строки/числа** — выносить в константы
❌ **Дублирование типов** — переиспользовать из entities
❌ **Стили в отдельных файлах** — использовать Tailwind инлайн
❌ **Условные импорты** — все импорты в начале файла

## Если нужно изменить существующий код

1. Создать **новый файл** рядом с существующим с суффиксом `V2`
   ```
   button.tsx → buttonV2.tsx
   ```

2. Использовать новый компонент только в новых местах

3. Постепенно мигрировать старый код на новый

4. Только после полной миграции удалять старый файл

## Проверка перед созданием нового файла

- [ ] Точно ли нет готового решения?
- [ ] Правильный ли слой для этого файла?
- [ ] Не нарушаются ли правила импортов?
- [ ] Все ли типы определены?
- [ ] Нет ли дублирования с существующим кодом?
- [ ] Соответствует ли именование правилам?

## Контакты
Если не уверены — спросить у тимлида. Лучше спросить, чем сломать.
```