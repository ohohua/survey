import type { Result } from '@/http'
import type { ComponentInfo } from '@/store/useComponentStore'
import { http, PREFIX } from './index'

export const getComponentList = (id: string) => http.get<Result<ComponentInfo[]>>(`${PREFIX}/component/${id}`)
