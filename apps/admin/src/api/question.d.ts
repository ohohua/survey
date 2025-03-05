export interface QuestionInfo<T> {
  id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  componentList: T
}
