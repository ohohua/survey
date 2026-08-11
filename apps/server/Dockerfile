FROM node:20-bookworm-slim

WORKDIR /app

ENV COREPACK_ENABLE_PROMPT=0
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV NODE_ENV=production

RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm run depend:init && pnpm run build:server

EXPOSE 8888

CMD ["node", "apps/server/dist/main.js"]
