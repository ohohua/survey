import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import postcssPluginPx2rem from 'postcss-plugin-px2rem'
import postcssPresetEnv from 'postcss-preset-env'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

const pathSrc = path.resolve(__dirname, 'src/types') // commonjs

const px2remOptions = {
  rootValue: 192, // 根元素的字体大小，一般为设计稿宽度/10，比如设计稿宽度为750px，则 rootValue 为 75
  unitPrecision: 5, // 转换后的 rem 值精度
  propList: ['*'], // 需要转换的 CSS 属性，* 表示所有
  exclude: /(node_module)/, // 排除转换的文件路径，一般排除 node_modules 目录

}

export default defineConfig({
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv(), // 自动补全浏览器前缀
        postcssPluginPx2rem(px2remOptions),
      ],
    },
  },
  plugins: [
    react(),
    AutoImport({ imports: ['react'], dts: path.resolve(pathSrc, 'auto-imports.d.ts') }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // 和 "@": pathSrc 等价
    },
  },
  server: {
    port: 8080,
  },
})
