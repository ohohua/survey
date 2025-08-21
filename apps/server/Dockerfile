# 使用官方 Node 镜像
FROM node:20-alpine AS base

# 安装 pnpm
# RUN corepack enable

# 设置非交互式环境
ENV COREPACK_ENABLE_PROMPT=0
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# ------------ 第一阶段：依赖安装 ------------
FROM base AS deps
# WORKDIR /app

# 复制全部源码
COPY . .

# 直接使用npm安装pnpm
RUN npm install -g pnpm@10.15.0

# 构建后端应用
RUN pnpm run build:server

# 暴露端口（与 main.ts 中配置的一致）
EXPOSE 8888

ENV NODE_ENV=production

# 启动应用
CMD ["node", "/dist/main"]
# CMD ["pnpm", "start:prod"]
