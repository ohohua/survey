export interface QuestionInfo<T = any> {
  id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createAt: string
  componentList?: T
}

export interface ListVo<T> {
  list: T[]
  total: number
}
