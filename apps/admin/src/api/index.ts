import { Request, RequestEnums } from '@survey/http'

export const http = new Request({
  baseURL: import.meta.env.VITE_SERVICE_BASE_URL,
  timeout: RequestEnums.TIMEOUT,
})

export const PREFIX = '/api/admin'

export * from './component'
export * from './question'
