FROM node:22-alpine AS frontend-builder

WORKDIR /app
COPY Frontend/package.json Frontend/package-lock.json ./Frontend/
WORKDIR /app/Frontend
RUN npm ci

WORKDIR /app
COPY Frontend ./Frontend
COPY Static ./Static
WORKDIR /app/Frontend
RUN npm run build

FROM caddy:2-alpine

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=frontend-builder /app/Frontend/dist /srv
