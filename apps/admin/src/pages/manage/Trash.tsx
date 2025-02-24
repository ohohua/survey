import type { TableRowSelection } from 'antd/es/table/interface'
import ListSearch from '@/components/ListSearch'
import { Button, Flex, Modal, Table, Tag, Typography } from 'antd'
import Column from 'antd/es/table/Column'
// import { useAntdTable } from 'ahooks'

interface DataType {
  id: number
  title: string
  isPublished: boolean
  answerNumber: number
  createAt: string
}

const { Title } = Typography

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

function Trash() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)
  const [modal, contextHolder] = Modal.useModal()
  // const {} = useAntdTable()

  const start = () => {
    setLoading(true)
    setTimeout(() => {
      setSelectedRowKeys([])
      setLoading(false)
    }, 1000)
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const hasSelected = selectedRowKeys.length > 0

  const handleRecover = () => {
    // 恢复
  }

  const handleDelete = async () => {
    const confirmed = await modal.confirm({
      content: '确定删除吗？',
      okText: '确定',
      cancelText: '取消',
    })

    if (confirmed) {
      // delete
    }
  }
  return (
    <>
      <Title level={3}>
        <Flex justify="space-between">
          <span>回收站</span>
          <ListSearch></ListSearch>
        </Flex>
      </Title>
      <Flex align="center" gap="middle">
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          批量恢复
        </Button>
        <Button type="primary" danger onClick={start} disabled={!hasSelected} loading={loading}>
          批量删除
        </Button>
      </Flex>
      &nbsp;
      <Table dataSource={dataSource} rowSelection={rowSelection} rowKey="id">
        <Column title="标题" dataIndex="title" />
        <Column
          title="发布状态"
          dataIndex="isPublished"
          render={(_, record) => (
            <>
              {record.isPublished ? <Tag color="blue">已发布</Tag> : <Tag>未发布</Tag>}
            </>
          )}
        />
        <Column title="答卷数量" dataIndex="answerNumber" />
        <Column title="创建时间" dataIndex="createAt" />
        <Column
          title="操作"
          dataIndex="action"
          render={(_, _record) => (
            <>
              <Button type="link" onClick={handleRecover}>恢复</Button>
              <Button type="link" danger onClick={handleDelete}>删除</Button>
            </>
          )}
        />
      </Table>
      {contextHolder}
    </>
  )
}
export default Trash
