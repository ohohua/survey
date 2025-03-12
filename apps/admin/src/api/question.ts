import type { ComponentInfo } from '@/store/useComponentStore'
import type { ListDto } from '@survey/http/src/types'
import type { ListVo, QuestionInfo, QuestionInfoDto, UpdateQuestionInfo } from './question.d'
import { http, PREFIX } from './index'

/**
 * 获取问卷列表
 * @param data 分页参数
 * @returns 问卷分页列表
 */
export const loadQuestionList = (data: ListDto) => http.get<ListVo<QuestionInfo>>(`${PREFIX}/question`, data)
/**
 * 获取问卷所有信息
 * @param id
 * @returns 标题，组件
 */
export const loadQuestionInfo = (id: string) => http.get<QuestionInfo<ComponentInfo[]>>(`${PREFIX}/question/${id}`)
/**
 * 新建问卷信息
 * @param data
 * @returns 问卷id
 */
export const saveQuestionInfo = (data: QuestionInfoDto) => http.post<string>(`${PREFIX}/question`, data)
/**
 * 修改问卷
 * @param data
 * @returns 修改状态
 */
export const updateQuestionInfo = (data: UpdateQuestionInfo) => http.put<string>(`${PREFIX}/question`, data)
/**
 * 发布问卷
 * @param id
 * @returns id
 */
export const publishQuestion = (id: string) => http.patch<string>(`${PREFIX}/question/${id}`)
