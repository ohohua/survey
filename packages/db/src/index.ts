import path from 'node:path'
// import { schemas } from '@survey/schema'
import dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/mysql2'

const envName = process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env'
dotenv.config({ path: path.resolve(__dirname, `../../../apps/api/${envName}`) })

// eslint-disable-next-line no-console
console.log('connection string: ', process.env.DATABASE_URL)

export const db = drizzle({ connection: { uri: process.env.DATABASE_URL } })
