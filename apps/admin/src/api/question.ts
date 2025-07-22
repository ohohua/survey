import type { ComponentInfo } from '@/store/useComponentStore'
import type { ListDto } from '@survey/http'
import type { ListVo, QuestionInfo, QuestionInfoDto, UpdateQuestionInfo } from './question.d'
import { http, PREFIX } from './index'

/**
 * 获取问卷列表
 * @param data 分页参数
 * @returns 问卷分页列表
 */
export const loadQuestionList = (data: ListDto) => http.get<ListVo<QuestionInfo>>(`${PREFIX}/question`, data)
/**
 * 获取星标问卷列表
 * @param data 分页参数
 * @returns 问卷分页列表
 */
export const loadQuestionStarList = (data: ListDto) => http.get<ListVo<QuestionInfo>>(`${PREFIX}/question/star-list`, data)
/**
 * 获取回收站问卷列表
 * @param data 分页参数
 * @returns 问卷分页列表
 */
export const loadQuestionTrashList = (data: ListDto) => http.get<ListVo<QuestionInfo>>(`${PREFIX}/question/trash-list`, data)
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
/**
 * 星标问卷，取消星标
 * @param id
 * @returns 标星状态语
 */
export const starQuestion = (id: string) => http.patch<string>(`${PREFIX}/question/star/${id}`)
/**
 * 删除问卷
 * @param id
 * @returns 标星状态语
 */
export const deleteQuestion = (id: string) => http.delete<string>(`${PREFIX}/question/${id}`)
/**
 * 复制问卷
 * @param id
 * @returns 复制成功
 */
export const copyQuestion = (id: string) => http.post<string>(`${PREFIX}/question/copy`, { id })
/**
 * 回收站删除问卷
 * @param ids
 * @returns 删除成功
 */
export const deleteQuestionTrash = (ids: string) => http.delete<ListVo<string>>(`${PREFIX}/question/trash/${ids}`)
/**
 * 回收站恢复问卷
 * @param ids
 * @returns 删除成功
 */
export const restoreQuestionTrash = (ids: string) => http.patch<ListVo<string>>(`${PREFIX}/question/restore/${ids}`)
