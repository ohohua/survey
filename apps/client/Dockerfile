FROM node:20-bookworm-slim

WORKDIR /app

ENV COREPACK_ENABLE_PROMPT=0
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0
ENV NODE_ENV=production

ARG NEXT_PUBLIC_URL=http://localhost:8888
ENV NEXT_PUBLIC_URL=${NEXT_PUBLIC_URL}

RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

COPY . .

RUN pnpm install --frozen-lockfile
RUN pnpm run depend:init && pnpm --filter client build

EXPOSE 3000

CMD ["pnpm", "--filter", "client", "start"]
