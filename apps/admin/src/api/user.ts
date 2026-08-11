import type { User } from '@survey/shared'
import { http, PREFIX } from './index'

export type LoginInfoDto = Pick<User, 'username' | 'password'>
export type RegisterInfoDto = LoginInfoDto & {
  nickname?: string
}

export interface LoginInfoVo {
  token: string
}

export const getPublicKey = () => http.get<{ publicKey: string }>(`api/auth/public-key`)

export const login = (payload: LoginInfoDto) => http.post<LoginInfoVo>(`${PREFIX}/user/login`, payload)

export const register = (payload: RegisterInfoDto) => http.post<LoginInfoVo>(`${PREFIX}/user/register`, payload)
