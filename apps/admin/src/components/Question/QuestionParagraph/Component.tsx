import type { QuestionParagraphProps } from './interface'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'
import { QuestionParagraphDefault } from './interface'

const { Text } = Typography

function QuestionParagraph(props: QuestionParagraphProps) {
  const { content = '', isCenter } = { ...QuestionParagraphDefault, ...props }

  const t = content.split('\n')
  return (
    <div style={{ pointerEvents: 'none' }}>
      <Text style={{ textAlign: isCenter ? 'center' : 'left' }}>
        {
          t.map((text, index) => (
            <span key={nanoid(5)}>
              {index > 0 && <br />}
              {text}
            </span>
          ))
        }
      </Text>
    </div>
  )
}

export default QuestionParagraph
