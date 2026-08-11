export interface QuestionInputProps {
  title?: string
  placeholder?: string
  isRequired?: boolean
  isLock?: boolean
  isHidden?: boolean
  onChange?: (newProps: QuestionInputProps) => void
}

export const QuestionInputDefault: QuestionInputProps = {
  title: '输入框标题',
  placeholder: '请输入',
  isRequired: false,
  isLock: false,
}
