import type { ComponentInfo } from '@/store/useComponentStore'
import type { ListDto, Result } from '@survey/http/src/types'
import type { QuestionInfo } from './question.d'
import { http, PREFIX } from './index'

export const loadQuestionList = (data: ListDto) => http.get<Result<ComponentInfo[]>>(`${PREFIX}/question`, data)

export const loadQuestionInfo = (id: string) => http.get<QuestionInfo<ComponentInfo[]>>(`${PREFIX}/question/${id}`)
