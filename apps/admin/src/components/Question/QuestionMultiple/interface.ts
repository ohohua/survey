export interface OptionsMultipleType {
  label: string
  value: string
}

export interface QuestionMultipleProps {
  title?: string
  vertical?: boolean
  checked?: string[]
  options?: OptionsMultipleType[]
  isLock?: boolean
  onChange?: (newProps: QuestionMultipleProps) => void
}

export const QuestionMultipleDefault: QuestionMultipleProps = {
  title: '多选标题',
  vertical: false,
  checked: [],
  options: [
    {
      label: '选项1',
      value: 'item1',
    },
    {
      label: '选项2',
      value: 'item2',
    },
  ],
  isLock: false,
}
