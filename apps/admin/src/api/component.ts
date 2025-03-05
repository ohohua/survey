import type { ComponentInfo } from '@/store/useComponentStore'
import type { Result } from '@survey/http/src/types'
import { http, PREFIX } from './index'

export const getComponentList = (id: string) => http.get<Result<ComponentInfo[]>>(`${PREFIX}/component/${id}`)
