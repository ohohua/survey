1. 可以使用 `drizzle-kit push` 命令直接将更改应用于数据库。这是在本地开发环境中快速测试新架构设计或修改的便捷方法，无需管理迁移文件即可进行快速迭代：

```shell
npx drizzle-kit push
```

2. 或者，可以使用 `drizzle-kit generate` 命令生成迁移，然后使用 `drizzle-kit migrate` 命令应用迁移：

生成迁移
```shell
npx drizzle-kit generate
```

应用迁移：
```shell
npx drizzle-kit migrate
```

