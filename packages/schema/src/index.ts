export * from './schema'
export * as schemas from './schema'
export { createId } from './schema'

export type SchemaType = typeof import('./schema')
