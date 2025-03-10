import type { QuestionTextareaProps } from './interface'
import TextArea from 'antd/es/input/TextArea'
import Paragraph from 'antd/es/typography/Paragraph'
import { QuestionTextareaDefault } from './interface'

function QuestionInput(props: QuestionTextareaProps) {
  const { title, placeholder } = { ...QuestionTextareaDefault, ...props }
  return (
    <div style={{ pointerEvents: 'none' }}>
      <Paragraph strong>{title}</Paragraph>
      <TextArea placeholder={placeholder} autoSize={{ minRows: 3, maxRows: 6 }} />
    </div>
  )
}

export default QuestionInput
