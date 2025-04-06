import type { ComponentInfo } from '@/store'
import { COMPONENT_TYPE } from '@survey/common'
import { Table } from 'antd'
import Column from 'antd/es/table/Column'
import s from './index.module.scss'

interface DataType {
  id: number
  title: string
  isPublished: boolean
  answerNumber: number
  createAt: string
}

interface StatAnswerProps {
  list: ComponentInfo[]
  selectId: string | undefined
  loading: boolean
}

const dataSource: DataType[] = [
  {
    id: 1,
    title: 'Question 12',
    isPublished: true,
    answerNumber: 10,
    createAt: '2021-09-01',
  },
  {
    id: 2,
    title: 'Question 2',
    isPublished: false,
    answerNumber: 20,
    createAt: '2021-09-02',
  },
  {
    id: 3,
    title: 'Question 2',
    isPublished: false,
    answerNumber: 20,
    createAt: '2021-09-02',
  },
  {
    id: 4,
    title: 'Question 2',
    isPublished: false,
    answerNumber: 20,
    createAt: '2021-09-02',
  },
  {
    id: 5,
    title: 'Question 2',
    isPublished: false,
    answerNumber: 20,
    createAt: '2021-09-02',
  },
  {
    id: 6,
    title: 'Question 2',
    isPublished: false,
    answerNumber: 20,
    createAt: '2021-09-02',
  },

]
function StatAnswer(props: StatAnswerProps) {
  const { list, selectId: _selectId, loading } = props
  const needComponentColumnType = [COMPONENT_TYPE.INPUT, COMPONENT_TYPE.RADIO, COMPONENT_TYPE.MULTIPLE, COMPONENT_TYPE.TEXTAREA]
  const columns = list.filter(item => needComponentColumnType.includes(item.type as COMPONENT_TYPE)).map(item => ({ title: item.props.title, dataIndex: item.id }))

  if (loading) {
    return <>loading</>
  }
  return (
    <div className={s.center}>
      <Table dataSource={dataSource} rowKey="id">
        {
          columns.map(c => <Column {...c} key={c.dataIndex} />)
        }
      </Table>
    </div>
  )
}

export default memo(StatAnswer)
