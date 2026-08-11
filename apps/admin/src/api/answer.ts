import { http } from './index'

export interface AnswerStatRow {
  key: string
  submitId: string
  index: number
  createAt: string
  answers: Record<string, string>
}

export interface AnswerOptionStat {
  label: string
  value: string
  count: number
  percent: number
}

export interface AnswerSummary {
  componentId: string
  title: string
  type: string
  answers: Array<{
    submitId: string
    content: string
    createAt: string
  }>
  options: AnswerOptionStat[]
}

export interface AnswerStatVo {
  list: AnswerStatRow[]
  total: number
  summaries: AnswerSummary[]
}

export function loadAnswerStat(questionId: string, data: { current: number, pageSize: number }) {
  return http.get<AnswerStatVo>(`/api/admin/answer/stat/${questionId}`, data)
}
