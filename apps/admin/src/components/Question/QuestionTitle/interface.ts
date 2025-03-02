export interface QuestionTitleProps {
  title?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
}

export const QuestionTitleDefault: QuestionTitleProps = {
  title: '标题',
  level: 1,
  isCenter: false,
}
