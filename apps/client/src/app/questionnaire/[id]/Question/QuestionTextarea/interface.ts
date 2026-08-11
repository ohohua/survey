export interface QuestionTextareaProps {
  title?: string
  placeholder?: string
  isRequired?: boolean
  isLock?: boolean
  isHidden?: boolean
  onChange?: (newProps: QuestionTextareaProps) => void
}

export const QuestionTextareaDefault: QuestionTextareaProps = {
  title: '文本域标题',
  placeholder: '请输入',
  isRequired: false,
  isLock: false,
}
