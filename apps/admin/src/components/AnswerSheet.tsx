import type { PropsWithChildren } from 'react'
import { CopyOutlined, DeleteOutlined, FormOutlined, FundOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { Button, Tag, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import s from './AnswerSheet.module.scss'

interface AnswerSheetProps {
  id: string
  title: string
  isPublished: boolean
  answerCount: number
  createAt: string
  isStar: boolean
}

function AnswerSheet(props: PropsWithChildren<AnswerSheetProps>) {
  const { id, title, isPublished, answerCount, createAt, isStar } = props
  const nav = useNavigate()

  const starStyle = isStar ? { color: '#F4BF4F' } : {}

  const handleEdit = () => {
    nav({ pathname: `/question/edit/${id}` })
  }
  const handleStat = () => {
    nav({ pathname: `/question/stat/${id}` })
  }
  const handleStar = () => {}
  const handleCopy = () => {}
  const handleDelete = () => {}

  return (
    <div className={s['answer-sheet']}>
      <div className={s['answer-sheet__question']}>
        <h3 className={s['answer-sheet__question--title']}>{title}</h3>
        <span className={s['answer-sheet__question--published']}>{isPublished ? <Tag color="blue">已发布</Tag> : <Tag>未发布</Tag>}</span>
        <span className={s['answer-sheet__question--number']}>
          答卷：
          {answerCount}
        </span>
        <div className={s['answer-sheet__question--create-at']}>{createAt}</div>
      </div>

      <div className={s['answer-sheet__control']}>
        <Tooltip title="编辑问卷">
          <Button type="text" shape="circle" icon={<FormOutlined />} onClick={handleEdit} />
        </Tooltip>
        <Tooltip title="数据统计">
          <Button type="text" shape="circle" icon={<FundOutlined />} onClick={handleStat} disabled={!isPublished} />
        </Tooltip>

        <div style={{ marginLeft: 'auto' }}>
          <Tooltip title="标星">
            <Button type="text" shape="circle" style={starStyle} icon={isStar ? <StarFilled /> : <StarOutlined />} onClick={handleStar} />
          </Tooltip>
          <Tooltip title="复制">
            <Button type="text" shape="circle" icon={<CopyOutlined />} onClick={handleCopy} />
          </Tooltip>
          <Tooltip title="删除">
            <Button type="text" shape="circle" icon={<DeleteOutlined />} onClick={handleDelete} />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default AnswerSheet
