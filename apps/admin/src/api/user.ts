import type { Result } from '@/http'
import type { LoginInfoDto, LoginInfoVo } from './user.d'
import { http, PREFIX } from './index'

export const getPublicKey = () => http.get<{ publicKey: string }>(`api/auth/public-key`)

export const login = (payload: LoginInfoDto) => http.post<LoginInfoVo>(`${PREFIX}/user/login`, payload)

export const register = (payload: LoginInfoDto) => http.post<Result<LoginInfoVo>>(`${PREFIX}/user/register`, payload)
