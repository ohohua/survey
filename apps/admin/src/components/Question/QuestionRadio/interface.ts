export interface OptionsRadioType { label: string, value: string }

export interface QuestionRadioProps {
  title?: string
  vertical?: boolean
  value?: string
  options?: OptionsRadioType[]
  isLock?: boolean
  onChange?: (newProps: QuestionRadioProps) => void
}

export const QuestionRadioDefault: QuestionRadioProps = {
  title: '单选标题',
  vertical: false,
  value: undefined,
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
