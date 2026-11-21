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
- [ ] Настроить SSH-туннель PostgreSQL для pgAdmin без открытия `5432` в интернет.
- [ ] Настроить Caddy и автоматический TLS, когда появится домен.

## 3. Автодеплой

- [ ] Добавить GitHub Secrets: `DEPLOY_HOST`, `DEPLOY_PORT`, `DEPLOY_USER`, `DEPLOY_SSH_PRIVATE_KEY`, `DEPLOY_KNOWN_HOSTS`.
- [ ] Добавить на VPS deploy-ключ GitHub для чтения репозитория.
- [ ] Создать `/opt/fiction-to-reality/deploy.sh` по инструкции в `DEPLOYMENT.md`.
- [ ] Выполнить workflow **Deploy API to VPS** вручную и проверить health endpoint.

## 4. Следующая разработка

- [ ] Описать доменные модели и миграции Alembic до появления реальных данных.
- [ ] Добавить аутентификацию, API-эндпоинты и тесты.
- [ ] Подключить frontend к API через домен/прокси.
