import type { PropsWithChildren } from 'react'
import { copyQuestion, deleteQuestion, starQuestion } from '@/api'
import { CalendarOutlined, CopyOutlined, DeleteOutlined, FileTextOutlined, FormOutlined, FundOutlined, StarFilled, StarOutlined } from '@ant-design/icons'
import { Button, message, Tag, Tooltip } from 'antd'
import { useNavigate } from 'react-router-dom'
import s from './AnswerSheet.module.scss'

interface AnswerSheetProps {
  id: string
  title: string
  isPublished: boolean
  answerCount: number
  createAt: string
  isStar: boolean
  onChange: () => void
}

function AnswerSheet(props: PropsWithChildren<AnswerSheetProps>) {
  const { id, title, isPublished, answerCount, createAt, isStar, onChange } = props
  const nav = useNavigate()

  const starStyle = isStar ? { color: '#F4BF4F' } : {}

  function handleEdit() {
    nav({ pathname: `/question/edit/${id}` })
  }
  function handleStat() {
    nav({ pathname: `/question/stat/${id}` })
  }
  async function handleStar() {
    const { data } = await starQuestion(id)
    message.success(data)
    onChange()
  }
  async function handleCopy() {
    const { data } = await copyQuestion(id)
    message.success(data)
    onChange()
  }
  async function handleDelete() {
    const { data } = await deleteQuestion(id)
    message.success(data)
    onChange()
  }

  return (
    <div className={s['answer-sheet']}>
      <div className={s['answer-sheet__question']}>
        <div className={s['answer-sheet__question--main']}>
          <h3 className={s['answer-sheet__question--title']}>{title}</h3>
          <div className={s['answer-sheet__question--meta']}>
            {isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>}
            <span>
              <FileTextOutlined />
              答卷
              {' '}
              {answerCount}
            </span>
            <span>
              <CalendarOutlined />
              {createAt}
            </span>
          </div>
        </div>
      </div>

      <div className={s['answer-sheet__control']}>
        <Tooltip title="编辑问卷">
          <Button icon={<FormOutlined />} onClick={handleEdit}>编辑</Button>
        </Tooltip>
        <Tooltip title="数据统计">
          <Button icon={<FundOutlined />} onClick={handleStat} disabled={!isPublished}>统计</Button>
        </Tooltip>

        <div className={s['answer-sheet__minor-control']}>
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
