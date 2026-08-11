import type { QuestionMultipleProps } from './interface'
import { Checkbox } from 'antd'

import Paragraph from 'antd/es/typography/Paragraph'
import { QuestionMultipleDefault } from './interface'

function QuestionRadio(props: QuestionMultipleProps) {
  const { title, options, vertical, checked, isRequired } = { ...QuestionMultipleDefault, ...props }

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }

  return (
    <div style={{ pointerEvents: 'none' }}>
      <Paragraph strong>
        {isRequired ? <span style={{ color: '#ff4d4f', marginRight: 4 }}>*</span> : null}
        {title}
      </Paragraph>
      <Checkbox.Group value={checked} options={options} style={vertical ? style : {}} />
    </div>
  )
}

export default QuestionRadio
