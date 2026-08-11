import type { QuestionRadioProps } from './interface'
import { Radio } from 'antd'

import Paragraph from 'antd/es/typography/Paragraph'
import { QuestionRadioDefault } from './interface'

function QuestionRadio(props: QuestionRadioProps) {
  const { title, options, vertical, value, isRequired } = { ...QuestionRadioDefault, ...props }

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
      <Radio.Group
        value={value}
        style={vertical ? style : {}}
        options={options}
      />

    </div>
  )
}

export default QuestionRadio
