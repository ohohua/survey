ARG NODE_IMAGE=node:20-bookworm-slim
FROM ${NODE_IMAGE} AS builder

WORKDIR /app

ENV COREPACK_ENABLE_PROMPT=0
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

ARG VITE_SERVICE_BASE_URL=
ARG VITE_SERVICE_MOBILE_URL=http://localhost:3000
ENV VITE_SERVICE_BASE_URL=${VITE_SERVICE_BASE_URL}
ENV VITE_SERVICE_MOBILE_URL=${VITE_SERVICE_MOBILE_URL}

RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm run depend:init && pnpm run build:admin

ARG NGINX_IMAGE=nginx:alpine
FROM ${NGINX_IMAGE}

COPY apps/admin/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/admin/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
