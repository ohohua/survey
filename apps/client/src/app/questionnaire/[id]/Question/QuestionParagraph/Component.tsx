'use client'

import type { QuestionParagraphProps } from './interface'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'
import { QuestionParagraphDefault } from './interface'

const { Text } = Typography

function QuestionParagraph(props: QuestionParagraphProps) {
  const { content = '', isCenter } = { ...QuestionParagraphDefault, ...props }

  const t = content.split('\n')
  return (
    <div>
      <Text>
        {
          t.map((text, index) => (
            <div key={nanoid(5)} style={{ textAlign: isCenter ? 'center' : 'left' }}>
              {index > 0 && <br />}
              {text}
            </div>
          ))
        }
      </Text>
    </div>
  )
}

export default QuestionParagraph
