import type { ComponentInfo } from '@/store/useComponentStore'
import type { ListDto } from '@survey/http/src/types'
import type { ListVo, QuestionInfo } from './question.d'
import { http, PREFIX } from './index'

/**
 * 获取问卷列表
 * @param data 分页参数
 * @returns 问卷分页列表
 */
export const loadQuestionList = (data: ListDto) => http.get<ListVo<QuestionInfo>>(`${PREFIX}/question`, data)

export const loadQuestionInfo = (id: string) => http.get<QuestionInfo<ComponentInfo[]>>(`${PREFIX}/question/${id}`)
