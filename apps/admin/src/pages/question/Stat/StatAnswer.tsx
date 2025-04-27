import type { ComponentInfo } from '@/store'
import { COMPONENT_TYPE } from '@survey/common'
import { Table } from 'antd'
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
  changeId: (id: string) => void
}

const needComponentColumnType = [COMPONENT_TYPE.INPUT, COMPONENT_TYPE.RADIO, COMPONENT_TYPE.MULTIPLE, COMPONENT_TYPE.TEXTAREA]
function StatAnswer(props: StatAnswerProps) {
  const { list, selectId, loading, changeId } = props
  const [dataSource, _setDataSource] = useState<DataType[]>([])

  const filterColumns = list.filter(item => needComponentColumnType.includes(item.type as COMPONENT_TYPE)).map((c) => {
    return {
      title: (
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => changeId(c.id)}
        >
          <span style={{ color: c.id === selectId ? '#1890ff' : 'inherit' }}>
            {c.props.title}
          </span>
        </div>
      ),
      dataIndex: c.id,
    }
  })

  if (loading) {
    return <>loading</>
  }

  return (
    <div className={s.center}>
      <Table columns={filterColumns} dataSource={dataSource} pagination={false} />
    </div>
  )
}

export default memo(StatAnswer)
