# 第一阶段：构建阶段
FROM node:18.0-alpine3.14 AS builder

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

RUN npm config set registry https://registry.npmmirror.com/

# 安装依赖
RUN npm install

# 安装envdot
# RUN npm install -g envdot

# 复制项目文件
COPY . .

# 生成 Prisma 客户端
RUN npx prisma generate

# 构建项目
RUN npm run build

# 第二阶段：生产阶段
FROM node:18.0-alpine3.14 AS production

# 设置工作目录
WORKDIR /app

# 安装生产环境依赖
COPY --from=builder /app/package*.json ./

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install --only=production

# 复制构建好的文件
COPY --from=builder /app/dist ./dist

# 复制 .env 文件
COPY .env.dev ./
COPY .env.prod ./

# 复制 Prisma 相关文件
COPY --from=builder /app/prisma ./prisma

# 生成 Prisma 客户端
RUN npx prisma generate

# 设置环境变量
ENV NODE_ENV=production

# 暴露端口
EXPOSE 3005

# 启动脚本
COPY ./start.sh /start.sh
RUN chmod +x /start.sh

# 启动应用
# CMD ["node", "dist/main.js"]
CMD ["/start.sh"]

