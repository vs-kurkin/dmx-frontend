# @dmx-cloud/dmx-frontend

Frontend сервиса управления световым оборудованием.

**Функциональность**
-------------------

* Управление DMX-оборудованием по различным протоколам (сеть, COM-порт)
* Конфигурирование приборов в виде реальных физических устройств
* Низкоуровневое управление DMX-протоколом
* Визуализация состояния через двухсторонний канал событий

**Используемые технологии**
-------------

* [TypeScript](https://typescriptlang.org): система типов для JavaScript
* [Node.js](https://nodejs.org): платформа для запуска приложения
* [Vue.js](https://vuejs.org/): фреймворк для клиентской части приложения
* [Vite](https://vite.dev/): сборка и запуск приложения
* [Vuex](https://v3.vuex.vuejs.org/): стейт-менеджер для Vue
* [PrimeVue](https://primevue.org/): библиотека Vue-компонентов
* [PrimeFlex](https://primeflex.primefaces.org/): библиотека CSS-компонентов

**Настройки**
-------------

* **NPM**: `package.json` - основной файл конфигурации проекта
* **Environment**: `src/configs/env.ts` - переменные окружения
* **Vite**: `vite.config.ts` - параметры сборки и запуска приложения
* **Backend**: `src/configs/api.ts` - конфигурация API
* **SSE**: `src/configs/sse.ts` - опции канала серверных событий (Server-Sent Events)
* **WebSocket**: `src/configs/websocket.ts` - опции канала клиентских событий (WebSockets)
* **Devtools**: `src/configs/devtools.ts` - параметры инструментов отладки
* **Sentry**: `src/configs/sentry.ts` - настройки инфраструктуры отслеживания ошибок

**Использование**
----------------------

Сборка и запуск:
* `npm run build`: сборка приложения для боевого окружения
* `npm run preview`: запуск собранного приложения

Тестирование и анализ:
* `npm run lint`: анализ кода с помощью ESLint
* `npm run lint:style`: анализ стилей с помощью Stylelint
* `npm run lint:markup`: анализ разметки с помощью Vue TSC
* `npm run lint:types`: анализ типов с помощью Vue TSC
* `npm run check:development`: проверка окружения разработки
* `npm run check:production`: проверка боевого окружения

Разработка:
* `npm run dev`: запуск приложения в режиме разработки
* `npm run dev:clean`: очистка изменений git-репозитория
* `npm run dev:format`: форматирование кода с помощью ESLint
* `npm run dev:update`: обновление зависимостей
* `npm run dev:optimize`: оптимизация зависимостей

**Лицензия**
------------

DMX-Frontend распространяется под лицензией MIT.
### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
