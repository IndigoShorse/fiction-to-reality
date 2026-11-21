# Развёртывание API на VPS

## Первый запуск

На сервере (под `root` или пользователем с `sudo`) установите Docker:

```bash
apt update
apt install -y ca-certificates curl git
curl -fsSL https://get.docker.com | sh
```

Клонируйте репозиторий в фиксированное место. Если он приватный, добавьте на сервере отдельный GitHub deploy key с правом **Read-only**:

```bash
git clone git@github.com:OWNER/REPOSITORY.git /opt/fiction-to-reality
cd /opt/fiction-to-reality
cp .env.example .env
nano .env
docker compose up -d --build
curl http://127.0.0.1:8000/health
```

Пароль в `.env` должен быть длинным случайным значением и совпадать в `POSTGRES_PASSWORD` и `DATABASE_URL`. Файл не попадает в Git.

## Скрипт, который вызывает GitHub Actions

Создайте `/opt/fiction-to-reality/deploy.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd /opt/fiction-to-reality
git fetch origin main
git reset --hard origin/main
docker compose up -d --build --remove-orphans
docker image prune -f
curl --fail --silent http://127.0.0.1:8000/health
```

И сделайте его исполняемым:

```bash
chmod 700 /opt/fiction-to-reality/deploy.sh
```

## Secrets для workflow

В GitHub: **Settings → Secrets and variables → Actions** добавьте:

| Secret | Значение |
| --- | --- |
| `DEPLOY_HOST` | IP VPS, например `176.12.66.29` |
| `DEPLOY_PORT` | SSH-порт VPS: `2222` |
| `DEPLOY_USER` | Пользователь на VPS (`root` на первом этапе или отдельный deploy-пользователь) |
| `DEPLOY_SSH_PRIVATE_KEY` | Приватный ключ, которым Actions войдёт на VPS |
| `DEPLOY_KNOWN_HOSTS` | Результат `ssh-keyscan -H -p 2222 176.12.66.29`, проверенный по fingerprint VPS |

После этого push в `main`, затрагивающий `Backend/` или `compose.yaml`, выполнит деплой. Workflow не выводит секреты в логи.

> До настройки Nginx API намеренно не открыто извне: Compose привязывает порт `8000` к `127.0.0.1`.

## Доступ к PostgreSQL из pgAdmin через SSH

PostgreSQL опубликован только на `127.0.0.1:5432` VPS. Не открывайте порт `5432` в UFW или firewall хостинга.

На вашем ПК откройте отдельное окно PowerShell и оставьте его запущенным:

```powershell
ssh -N -L 5433:127.0.0.1:5432 -p 2222 root@176.12.66.29
```

В pgAdmin зарегистрируйте сервер со следующими параметрами:

| Поле | Значение |
| --- | --- |
| Host name/address | `127.0.0.1` |
| Port | `5433` |
| Maintenance database | `f2r` |
| Username | значение `POSTGRES_USER` из `.env` |
| Password | значение `POSTGRES_PASSWORD` из `.env` |

Закрытие окна PowerShell закрывает туннель. Если SSH использует другого пользователя, замените `root` в команде на него.
