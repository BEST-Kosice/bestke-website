# DEPLOY_PLESK.md — Деплой на Plesk (best.tuke.sk)

> Монорепозиторий: `/frontend` (Vite/React) + `/backend` (Strapi 5).  
> Один и тот же GitHub-репозиторий подключается в Plesk **дважды**:
> - `best.tuke.sk` → статический фронтенд
> - `api.best.tuke.sk` → Node.js приложение Strapi

---

## Содержание
1. [Предварительные требования](#1-предварительные-требования)
2. [Настройка базы данных PostgreSQL в Plesk](#2-настройка-postgresql-в-plesk)
3. [Деплой фронтенда — best.tuke.sk](#3-деплой-фронтенда--besttukessk)
4. [Деплой бэкенда — api.best.tuke.sk](#4-деплой-бэкенда--apibesttukessk)
5. [Переменные окружения бэкенда (полный список)](#5-переменные-окружения-бэкенда)
6. [Uploads — сохранность файлов между деплоями](#6-uploads)
7. [Доступ к админке Strapi](#7-доступ-к-админке-strapi)
8. [Обновление (routine deploy)](#8-обновление-после-push-в-github)
9. [Проверка работоспособности](#9-проверка-работоспособности)
10. [Устранение проблем](#10-устранение-проблем)

---

## 1. Предварительные требования

| Что | Где проверить |
|-----|--------------|
| Домен `best.tuke.sk` привязан к хостингу | Plesk → Websites & Domains |
| Поддомен `api.best.tuke.sk` создан | Plesk → Websites & Domains → Add Subdomain |
| SSL-сертификаты на обоих доменах | Plesk → SSL/TLS Certificates → Let's Encrypt |
| Node.js Extension установлен в Plesk | Plesk → Extensions → Node.js |
| PostgreSQL Extension установлен | Plesk → Extensions → PostgreSQL |

---

## 2. Настройка PostgreSQL в Plesk

1. Plesk → **Databases** → **Add Database**
2. Тип: **PostgreSQL**
3. Заполни:
   - **Database name**: `bestkosice` (или любое другое)
   - **Database user**: придумай логин
   - **Password**: придумай пароль
4. После создания — нажми **Connection Info** и скопируй:
   - **Host**: обычно `localhost` (или `127.0.0.1`)
   - **Port**: `5432`
   - Имя БД, пользователь и пароль — из шага 3

> **Эти значения понадобятся на шаге 4 при вводе env-переменных.**

---

## 3. Деплой фронтенда — `best.tuke.sk`

### 3.1 Git Deployment

1. Plesk → **best.tuke.sk** → **Git**
2. Нажми **Add repository**
3. Заполни:
   - **Remote URL**: `https://github.com/<your-org>/bestke-website.git`
   - **Branch**: `main`
   - **Repository path** (куда клонировать): `/var/www/vhosts/best.tuke.sk/repo`  
     *(путь вне `httpdocs` — это staging-директория)*
   - ✅ **Enable deployment** — включи
4. **Deploy actions** — вставь точно это:

```bash
cd frontend
npm ci
VITE_STRAPI_URL=https://api.best.tuke.sk npm run build
rm -rf /var/www/vhosts/best.tuke.sk/httpdocs/*
cp -r dist/. /var/www/vhosts/best.tuke.sk/httpdocs/
```

5. **Webhook**: нажми **Copy webhook URL** и добавь в GitHub:  
   GitHub репозиторий → **Settings → Webhooks → Add webhook**  
   - Payload URL: вставь скопированный URL
   - Content type: `application/json`
   - Event: **Just the push event**

### 3.2 Nginx — обработка SPA-роутинга

Чтобы прямые переходы по URL (например `/news/slug`) не давали 404, нужно настроить nginx fallback.

1. Plesk → **best.tuke.sk** → **Apache & nginx Settings**
2. Раздел **Additional nginx directives** — вставь:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

3. Нажми **Apply**.

---

## 4. Деплой бэкенда — `api.best.tuke.sk`

### 4.1 Git Deployment

1. Plesk → **api.best.tuke.sk** → **Git**
2. Нажми **Add repository**
3. Заполни:
   - **Remote URL**: `https://github.com/<your-org>/bestke-website.git`
   - **Branch**: `main`
   - **Repository path**: `/var/www/vhosts/api.best.tuke.sk/repo`
   - ✅ **Enable deployment**
4. **Deploy actions**:

```bash
cd backend
npm ci --omit=dev
npm run build
```

> ⚠ **НЕ добавляй `rm -rf` в deploy actions** — это может удалить `public/uploads/`. После pull git не трогает файлы, которых нет в репозитории, так что uploads сохраняются автоматически.

### 4.2 Node.js Application

1. Plesk → **api.best.tuke.sk** → **Node.js**
2. Нажми **Enable Node.js**
3. Заполни:

| Поле | Значение |
|------|----------|
| **Node.js version** | `21.7.3` (или выбери актуальную LTS ≥ 20) |
| **Package manager** | `npm` |
| **Application mode** | `production` |
| **Application root** | `/var/www/vhosts/api.best.tuke.sk/repo/backend` |
| **Application startup file** | `app.js` |
| **Document root** | `/var/www/vhosts/api.best.tuke.sk/httpdocs` *(оставь по умолчанию)* |

4. Нажми **Apply** / **Enable**.

### 4.3 Environment Variables

В том же разделе **Node.js** → кнопка **Environment Variables** (или **Edit** рядом с env section). Добавь каждую‑по‑одной:

| Переменная | Значение |
|-----------|---------|
| `NODE_ENV` | `production` |
| `HOST` | `0.0.0.0` |
| `PORT` | *(оставь пустым — Plesk подставит сам)* |
| `STRAPI_URL` | `https://api.best.tuke.sk` |
| `IS_BEHIND_PROXY` | `true` |
| `CORS_ORIGINS` | `https://best.tuke.sk` |
| `APP_KEYS` | `key1,key2,key3,key4` — см. [раздел 5](#5-переменные-окружения-бэкенда) |
| `API_TOKEN_SALT` | *сгенерированное значение* |
| `ADMIN_JWT_SECRET` | *сгенерированное значение* |
| `TRANSFER_TOKEN_SALT` | *сгенерированное значение* |
| `ENCRYPTION_KEY` | *сгенерированное значение* |
| `DATABASE_CLIENT` | `postgres` |
| `DATABASE_HOST` | `localhost` *(из шага 2)* |
| `DATABASE_PORT` | `5432` |
| `DATABASE_NAME` | *из шага 2* |
| `DATABASE_USERNAME` | *из шага 2* |
| `DATABASE_PASSWORD` | *из шага 2* |
| `DATABASE_SSL` | `false` *(если Plesk Postgres без SSL)* |

### 4.4 Первый запуск

1. После настройки env-переменных нажми **Restart App** в разделе Node.js.
2. Подожди 30–60 секунд.
3. Открой `https://api.best.tuke.sk/` — должен ответить Strapi (JSON или 404 на `/`).
4. Открой `https://api.best.tuke.sk/admin` — страница создания первого администратора.

---

## 5. Переменные окружения бэкенда

### Как сгенерировать секреты

Выполни в терминале (на любой машине с Node.js):

```bash
node -e "
const c = require('crypto');
console.log('APP_KEYS=' + [1,2,3,4].map(() => c.randomBytes(16).toString('base64')).join(','));
console.log('API_TOKEN_SALT=' + c.randomBytes(16).toString('base64'));
console.log('ADMIN_JWT_SECRET=' + c.randomBytes(16).toString('base64'));
console.log('TRANSFER_TOKEN_SALT=' + c.randomBytes(16).toString('base64'));
console.log('ENCRYPTION_KEY=' + c.randomBytes(16).toString('base64'));
"
```

Скопируй вывод в Plesk env-переменные.

> ⚠ Секреты генерируются один раз. Смена `ADMIN_JWT_SECRET` разлогинит всех пользователей; смена `APP_KEYS` инвалидирует сессии.

### Зачем `NODE_ENV=production`

- Strapi использует `dist/` (скомпилированный TS) вместо исходников — обязательно для `node app.js`
- Отключает отладочные логи и dev-мидлвари
- Включает оптимизированные bildings зависимостей
- Требуется, чтобы `npm run build` сгенерировал продакшн-сборку админки

---

## 6. Uploads

### Как работает

- `backend/public/uploads/` исключён из git (`.gitignore`), но папка создаётся через `.gitkeep`
- `git pull` (деплой Plesk) **не удаляет** файлы вне git — uploads сохраняются между деплоями автоматически
- **Правило**: никогда не добавляй `rm -rf backend/public/uploads` в deploy actions

### После первого деплоя — создать папку

Если папка `uploads/` не существует на сервере, Strapi упадёт при загрузке файла. Создай её один раз через SSH или файловый менеджер Plesk:

**Plesk File Manager**:
1. Plesk → **api.best.tuke.sk** → **Files**
2. Перейди в `repo/backend/public/`
3. Нажми **New directory** → `uploads`

---

## 7. Доступ к админке Strapi

### Вариант A — Прямой URL (основной)

Открывай `https://api.best.tuke.sk/admin` напрямую.

### Вариант B — Редирект с best.tuke.sk/admin

При переходе на `https://best.tuke.sk/admin` (физический файл `dist/admin/index.html`) браузер автоматически перенаправится на `https://api.best.tuke.sk/admin`.

Этот файл уже добавлен в репозиторий: `frontend/public/admin/index.html`.

### Вариант C — Nginx Reverse Proxy (опционально)

Если нужно сделать `/admin` и `/api` прозрачным прокси через `best.tuke.sk`:

1. Plesk → **best.tuke.sk** → **Apache & nginx Settings**
2. В **Additional nginx directives**:

```nginx
location /admin {
    proxy_pass https://api.best.tuke.sk/admin;
    proxy_set_header Host api.best.tuke.sk;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

location /api {
    proxy_pass https://api.best.tuke.sk/api;
    proxy_set_header Host api.best.tuke.sk;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

> ⚠ Вариант C сложнее в настройке и необязателен — Варианта A или B достаточно.

---

## 8. Обновление после push в GitHub

При push в `main` Plesk Webhook автоматически:

1. Делает `git pull` в обеих repo-директориях
2. Запускает Deploy actions (install + build)
3. **Бэкенд**: необходимо нажать **Restart** в разделе Node.js вручную (Plesk не перезапускает приложение автоматически после деплоя).

> **Памятка**: После каждого push в backend — зайди в Plesk → **api.best.tuke.sk** → **Node.js** → **Restart App**.

---

## 9. Проверка работоспособности

| Что проверяем | Ожидаемый результат |
|--------------|---------------------|
| `https://best.tuke.sk` | Открывается главная страница сайта |
| `https://best.tuke.sk/news` | Открывается страница новостей (SPA роутинг) |
| `https://best.tuke.sk/admin` | Редирект на `https://api.best.tuke.sk/admin` |
| `https://api.best.tuke.sk/api/articles` | JSON-ответ от Strapi (может быть пустой массив) |
| `https://api.best.tuke.sk/admin` | Страница входа в Strapi Admin |
| Загрузка медиафайла в Strapi Admin | Файл сохраняется, URL работает |
| Push в GitHub → 2-3 мин → F5 на сайте | Изменения применились |

---

## 10. Устранение проблем

### Strapi не запускается

1. Plesk → **api.best.tuke.sk** → **Node.js** → **View Logs**
2. Типичные причины:
   - `Error: Cannot find module '@strapi/strapi'` → deploy actions не выполнились, нажми **Deploy** вручную
   - `DATABASE_CLIENT is required` → env-переменные не сохранены
   - `EADDRINUSE` → другой процесс занял порт, нажми **Restart App**
   - `Error: APP_KEYS is required` → заполни env переменную `APP_KEYS`

### 404 на фронтенде при прямом переходе

- Проверь nginx директиву `try_files $uri $uri/ /index.html;` из шага 3.2

### CORS ошибка в браузере

- Проверь env-переменную `CORS_ORIGINS=https://best.tuke.sk` в Plesk
- Нажми **Restart App**

### Uploads пропали после деплоя

- Проверь deploy actions — там НЕ должно быть `rm -rf`
- Убедись, что папка `uploads/` существует: Plesk → **api.best.tuke.sk** → **Files** → `repo/backend/public/uploads/`

### `dist/` не найден при запуске

- Deploy actions должны включать `npm run build` в папке `backend/`
- `NODE_ENV=production` должен быть установлен в env-переменных
