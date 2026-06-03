import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  tsconfig: 'tsconfig.build.json',
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['esm', 'cjs'],
  dts: true,
})
