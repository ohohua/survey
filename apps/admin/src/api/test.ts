import { http } from './index'

export const test = () => http.get<string>('api/test')
