# Opishnya Bazar

Повнофункціональний веб-застосунок для платформи Opishnya Bazar, побудований з використанням сучасних технологій.

## Структура проєкту

```
Opishnya_bazar/
├── client/          # Vue 3 фронтенд-застосунок
└── server/           # Hono API сервер
```

## Технології

### client
- **Vue 3** - прогресивний JavaScript фреймворк
- **TypeScript** - типізована надбудова над JavaScript
- **Vite** - швидкий інструмент збірки
- **PrimeVue** - бібліотека UI компонентів
- **Pinia** - управління станом
- **Vue Router** - маршрутизація
- **TanStack Vue Query** - управління серверним станом
- **Vitest** - тестування

### server
- **Hono** - легкий веб-фреймворк
- **Bun** - швидкий JavaScript runtime
- **TypeScript** - типізація

## Вимоги

- **Node.js**: ^20.19.0 або >=22.12.0
- **Bun**: Остання версія

## Встановлення та запуск

### client

```bash
cd client
bun install
bun dev
```

Фронтенд буде доступний за адресою, вказаною Vite (зазвичай http://localhost:5173)

### server

```bash
cd server
bun install
bun dev
```

Бекенд запуститься на http://localhost:3000

## Команди розробки

### client

```bash
bun dev          # Запуск dev сервера з hot reload
bun test:unit    # Запуск unit тестів
bun build        # Збірка для production
bun lint         # Lint та auto-fix
bun format       # Форматування коду
```

### server

```bash
bun dev          # Запуск dev сервера з hot reload
```

## Розробка

1. Клонуйте репозиторій
2. Встановіть залежності в обох директоріях (client та server)
3. Запустіть обидва сервери для повної функціональності

