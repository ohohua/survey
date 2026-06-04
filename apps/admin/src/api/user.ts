import type { Result } from '@/http'
import type { User } from '@survey/shared'
import { http, PREFIX } from './index'

export type LoginInfoDto = Pick<User, 'username' | 'password'>

export interface LoginInfoVo {
  token: string
}

export const getPublicKey = () => http.get<{ publicKey: string }>(`api/auth/public-key`)

export const login = (payload: LoginInfoDto) => http.post<LoginInfoVo>(`${PREFIX}/user/login`, payload)

export const register = (payload: LoginInfoDto) => http.post<Result<LoginInfoVo>>(`${PREFIX}/user/register`, payload)
