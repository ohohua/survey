'use client'

import type { QuestionTitleProps } from './interface'
import Title from 'antd/es/typography/Title'
import { QuestionTitleDefault } from './interface'

function QuestionTitle(props: QuestionTitleProps) {
  const { title, level, isCenter } = { ...QuestionTitleDefault, ...props }

  const getSize = () => {
    if (level === 1)
      return '24px'
    if (level === 2)
      return '20px'
    return '16px'
  }
  return (
    <div>
      <Title
        level={level}
        style={{
          textAlign: isCenter ? 'center' : 'start',
          marginBottom: 0,
          fontSize: getSize(),
        }}
      >
        {title}
      </Title>
    </div>
  )
}

export default QuestionTitle
