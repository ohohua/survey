import type { QuestionParagraphProps } from './interface'
import { Typography } from 'antd'
import { QuestionParagraphDefault } from './interface'

const { Text } = Typography

function QuestionParagraph(props: QuestionParagraphProps) {
  const { content = '', isCenter } = { ...QuestionParagraphDefault, ...props }

  const t = content.replaceAll('\n', '<br>')
  return (
    <div style={{ pointerEvents: 'none' }}>
      <Text style={{ textAlign: isCenter ? 'center' : 'left' }}>
        <span dangerouslySetInnerHTML={{ __html: t }}></span>
      </Text>
    </div>
  )
}

export default QuestionParagraph
