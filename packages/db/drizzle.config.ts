// import 'dotenv/config'
import path from 'node:path'
import process from 'node:process'
import * as dotenv from 'dotenv'
import { defineConfig } from 'drizzle-kit'

dotenv.config({ path: path.resolve(__dirname, '../../apps/server/.env.dev') })

console.log('process.env.DATABASE_URL: ', process.env.DATABASE_URL)

export default defineConfig({
  out: './drizzle',
  schema: '../schema/src/schema/*',
  dialect: 'mysql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
