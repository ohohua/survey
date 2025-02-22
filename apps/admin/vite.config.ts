import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import react from '@vitejs/plugin-react'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

const pathSrc = path.resolve(__dirname, 'src/types') // commonjs

export default defineConfig({
  plugins: [
    react(),
    AutoImport({ imports: ['react'], dts: path.resolve(pathSrc, 'auto-imports.d.ts') }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // 和 "@": pathSrc 等价
    },
  },
})
