export interface QuestionTextareaProps {
  title?: string
  placeholder?: string
  isLock?: boolean
  onChange?: (newProps: QuestionTextareaProps) => void
}

export const QuestionTextareaDefault: QuestionTextareaProps = {
  title: '文本域标题',
  placeholder: '请输入',
  isLock: false,
}
