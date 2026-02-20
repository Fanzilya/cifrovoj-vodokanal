```markdown
# 30_pages.md — Создание страниц (pages)

## Где создавать страницы

Страницы создаются в `src/app/(moduls)/[module]/[page-name]/`

```
src/app/(moduls)/
├── (auth)/                    # Группа страниц авторизации
│   ├── _layout.tsx            # Layout для auth
│   └── index.tsx              # Страница входа
├── dispatcher/                 # Модуль диспетчера
│   ├── _layout.tsx            # Layout диспетчера (Stack/Tabs)
│   ├── index.tsx              # Главная диспетчера
│   ├── hardware-list/         # Страница списка оборудования
│   │   └── index.tsx
│   ├── hardware-about/        # Страница информации об оборудовании
│   │   └── index.tsx
│   └── [id]/                  # Динамическая страница
│       └── index.tsx
└── domain/                     # Модуль домена
    ├── _layout.tsx
    ├── registry-objects/
    │   └── index.tsx
    └── passport/
        ├── _layout.tsx        # Вложенный layout
        └── [id]/              # Динамический роут (паспорт объекта)
            └── index.tsx
```

## Типы файлов в pages

| Файл | Назначение | Когда использовать |
|------|------------|-------------------|
| `index.tsx` | Основная страница | Всегда для каждой страницы |
| `_layout.tsx` | Обертка с навигацией | Когда нужно группировать страницы или добавить Stack/Tabs |
| `[param].tsx` | Динамическая страница | Когда URL содержит параметр (id, slug) |
| `components/` | Локальные компоненты | Когда компонент используется только на этой странице |

## Правила создания страниц

### 1. Индексовый файл (index.tsx)

```tsx
// src/app/(moduls)/dispatcher/hardware-list/index.tsx

// Импорты только с нижних слоев (widgets, features, entities, shared)
import { WidgetName } from '@packages/widgets'
import { useLocalObservate r } from 'mobx-react-lite'
import { PageModel } from '@/features/dispatcher/hardware-list-model'

// Компонент должен быть дефолтным экспортом
export default function PageName() {
  // 1. Локальный стор страницы (если нужен)
  const store = useLocalObservable(() => new PageModel())
  
  // 2. Загрузка данных при монтировании
  useEffect(() => {
    store.loadData()
  }, [])
  
  // 3. Рендер с использованием виджетов
  return (
    <View className="flex-1 p-4">
      <WidgetName 
        data={store.data}
        loading={store.loading}
        onAction={store.handleAction}
      />
    </View>
  )
}
```

### 2. Layout файл (_layout.tsx)

```tsx
// src/app/(moduls)/dispatcher/_layout.tsx

import { Stack, Tabs } from 'expo-router'

export default function ModuleLayout() {
  // Stack для навигации "вперед-назад"
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Главная' }}
      />
      <Stack.Screen 
        name="hardware-list/index"
        options={{ title: 'Оборудование' }}
      />
    </Stack>
  )
  
  // Или Tabs для вкладок без перезагрузки
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Главная' }} />
      <Tabs.Screen name="hardware-list/index" options={{ title: 'Список' }} />
    </Tabs>
  )
}
```

### 3. Динамическая страница ([id].tsx)

```tsx
// src/app/(moduls)/dispatcher/hardware/[id]/index.tsx

import { useLocalSearchParams } from 'expo-router'

export default function HardwareDetail() {
  const { id } = useLocalSearchParams<{ id: string }>()
  
  // Используем id для загрузки данных
  useEffect(() => {
    if (id) {
      store.loadHardwareById(id)
    }
  }, [id])
  
  return ( ... )
}
```

## Правила композиции страницы

### ✅ Правильно
- Страница **не содержит бизнес-логику** (она в features)
- Страница **не содержит сложный UI** (он в widgets/shared)
- Страница только **компонует** готовые блоки
- Страница использует **локальный стор** из features

### ❌ Неправильно
```tsx
// ПЛОХО: логика и верстка в странице
export default function Page() {
  const [data, setData] = useState()
  const fetchData = async () => { ... } // логика здесь
  const handleSubmit = () => { ... } // логика здесь
  
  return (
    <View>
      {/* Сложная верстка здесь */}
      <View>...</View>
    </View>
  )
}
```

```tsx
// ХОРОШО: логика вынесена, верстка вынесена
export default function Page() {
  const store = useLocalObservable(() => new PageModel())
  
  return (
    <View>
      <Widget1 data={store.data} />
      <Widget2 onAction={store.handleAction} />
    </View>
  )
}
```

## Навигация между страницами

### Link компонент
```tsx
import { Link } from 'expo-router'

// На статическую страницу
<Link href="/dispatcher/hardware-list">
  <Text>К списку</Text>
</Link>

// На динамическую страницу
<Link href={`/dispatcher/hardware/${id}`}>
  <Text>Подробнее</Text>
</Link>
```

### Программная навигация
```tsx
import { useRouter } from 'expo-router'

const router = useRouter()

// Переход
router.push('/dispatcher/hardware-list')

// Назад
router.back()

// Замена (не добавляет в историю)
router.replace('/auth/login')

// С параметрами
router.push({
  pathname: '/dispatcher/hardware/[id]',
  params: { id: '123' }
})
```

## Получение параметров

```tsx
import { useLocalSearchParams } from 'expo-router'

// Для [id]/index.tsx
const { id } = useLocalSearchParams<{ id: string }>()

// Для страницы с несколькими параметрами
// dispatcher/hardware/[id]/[tab].tsx
const { id, tab } = useLocalSearchParams<{ id: string, tab: string }>()
```

## Структура новой страницы (шаблон)

```
src/app/(moduls)/[module]/[page-name]/
├── index.tsx                    # Основная страница
├── _layout.tsx                  # (опционально) если нужен свой layout
└── components/                   # (опционально) локальные компоненты
    ├── SomeComponent.tsx
    └── types.ts
```

## Порядок создания новой страницы

1. **Определить модуль** — в какую группу (moduls) добавить
2. **Создать папку** с названием страницы (kebab-case)
3. **Создать index.tsx** с дефолтным экспортом
4. **Создать _layout.tsx** если нужно группировать дочерние страницы
5. **Создать локальные компоненты** в `components/` (если нужны)
6. **Добавить навигацию** в родительский _layout.tsx

## Важные правила

1. **Один файл — одна страница** (кроме _layout)
2. **Не создавать страницы вне (moduls)**
3. **Не использовать глобальный стейт для данных одной страницы**
4. **Всегда типизировать параметры** useLocalSearchParams
5. **Проверять существование** компонента в shared перед созданием локального
```