import type { PropsWithChildren } from 'react'
import { CopyOutlined, DeleteOutlined, FormOutlined, FundOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import s from './AnswerSheet.module.scss'

interface AnswerSheetProps {
  title: string
  isPublished: boolean
  answerNumber: number
  createAt: string
  isStar: boolean
}

function AnswerSheet(props: PropsWithChildren<AnswerSheetProps>) {
  const { title, isPublished, answerNumber, createAt, isStar } = props

  const starStyle = isStar ? { color: '#F4BF4F' } : {}
  return (
    <div className={s['answer-sheet']}>
      <div className={s['answer-sheet__question']}>
        <h3 className={s['answer-sheet__question--title']}>{title}</h3>
        <span className={s['answer-sheet__question--published']}>{isPublished ? 'Published' : 'Not published'}</span>
        <span className={s['answer-sheet__question--number']}>
          答卷：
          {answerNumber}
        </span>
        <div className={s['answer-sheet__question--create-at']}>{createAt}</div>
      </div>

      <div className={s['answer-sheet__control']}>
        <Tooltip title="编辑问卷">
          <Button type="text" shape="circle" icon={<FormOutlined />} />
        </Tooltip>
        <Tooltip title="数据统计">
          <Button type="text" shape="circle" icon={<FundOutlined />} />
        </Tooltip>

        <div style={{ marginLeft: 'auto' }}>
          <Tooltip title="标星">
            <Button type="text" shape="circle" style={starStyle} icon={isStar ? <StarFilled /> : <StarOutlined />} />
          </Tooltip>
          <Tooltip title="复制">
            <Button type="text" shape="circle" icon={<CopyOutlined />} />
          </Tooltip>
          <Tooltip title="删除">
            <Button type="text" shape="circle" icon={<DeleteOutlined />} />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default AnswerSheet
