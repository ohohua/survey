import type { QuestionInputProps } from './interface'
import { Input } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import { QuestionInputDefault } from './interface'

function QuestionInput(props: QuestionInputProps) {
  const { title, placeholder, isRequired } = { ...QuestionInputDefault, ...props }
  return (
    <div style={{ pointerEvents: 'none' }}>
      <Paragraph strong>
        {isRequired ? <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span> : null}
        {title}
      </Paragraph>
      <Input placeholder={placeholder}></Input>
    </div>
  )
}

export default QuestionInput
