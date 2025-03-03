import type { QuestionInputProps } from './interface'
import { Input } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { QuestionInputDefault } from './interface'

function QuestionInput(props: QuestionInputProps) {
  const { title, placeholder } = { ...QuestionInputDefault, ...props }
  return (
    <div style={{ pointerEvents: 'none' }}>
      <Paragraph strong>{title}</Paragraph>
      <Input placeholder={placeholder}></Input>
    </div>
  )
}

export default QuestionInput
