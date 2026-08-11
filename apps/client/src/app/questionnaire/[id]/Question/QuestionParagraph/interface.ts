export interface QuestionParagraphProps {
  content?: string
  isCenter?: boolean
  isLock?: boolean
  isHidden?: boolean
  onChange?: (newProps: QuestionParagraphProps) => void
}

export const QuestionParagraphDefault: QuestionParagraphProps = {
  content: '段落',
  isCenter: false,
  isLock: false,
}
