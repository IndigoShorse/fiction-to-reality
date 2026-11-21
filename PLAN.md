# План запуска F2R

## 1. Основа проекта

- [x] Сохранить существующий Astro-фронтенд и GitHub Pages workflow.
- [x] Создать независимый FastAPI backend.
- [x] Сделать единый слой SQLAlchemy для SQLite и PostgreSQL.
- [x] Добавить Docker Compose для VPS с PostgreSQL.

## 2. Подготовка VPS

- [x] Установить Docker Engine и Docker Compose plugin.
- [x] Клонировать репозиторий в `/opt/fiction-to-reality`.
- [x] Создать `.env` по образцу `.env.example` и установить сильный пароль БД.
- [x] Запустить `docker compose up -d --build`.
- [x] Проверить `curl http://127.0.0.1:8000/health` на сервере.
- [x] Добавить Caddy как reverse proxy и сборку Astro frontend в Docker.
- [ ] Открыть TCP `80` в UFW и firewall провайдера; проверить `http://176.12.66.29/` и `/api/health`.
- [ ] Настроить прямой доступ pgAdmin: проброс `5432:5432` и whitelist только для публичного IP разработчика в UFW и firewall провайдера.
- [ ] После появления домена указать его A-запись на VPS, заменить адрес в `Caddyfile` и проверить автоматический TLS от Let's Encrypt.

## 3. Автодеплой

- [x] Добавить GitHub Secrets: `DEPLOY_HOST`, `DEPLOY_PORT`, `DEPLOY_USER`, `DEPLOY_SSH_PRIVATE_KEY`, `DEPLOY_KNOWN_HOSTS`.
- [x] Создать пользователя `github`, дать ему доступ к Docker и репозиторию, добавить отдельный SSH-ключ Actions.
- [x] Проверить доступ `github` к `/opt/fiction-to-reality` и создать `/opt/fiction-to-reality/deploy.sh`.
- [x] Выполнить workflow **Deploy API to VPS** вручную и проверить health endpoint.

## 4. Следующая разработка

- [ ] Описать доменные модели и добавить Alembic до появления реальных данных.
- [ ] Добавить аутентификацию, API-эндпоинты и тесты.
- [ ] Подключить frontend к API через `/api` и добавить клиент API.
