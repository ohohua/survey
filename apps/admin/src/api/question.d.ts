export interface QuestionInfo<T = any> {
  id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  backgroundImage?: string
  pageHeaderImage?: string
  createAt: string
  componentList?: T
}

export interface ListVo<T> {
  list: T[]
  total: number
}

export interface QuestionInfoDto {
  title?: string
  backgroundImage?: string
  pageHeaderImage?: string
  components?: {
    id?: string
    type: string
    sort: number
    props: string
  }[]
}

export interface UpdateQuestionInfo extends QuestionInfoDto {
  id: string
}
