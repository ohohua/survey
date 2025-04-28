import type { ListDto } from '@survey/http'
import { loadQuestionTrashList } from '@/api'
import ListSearch from '@/components/ListSearch'
import { usePagination } from 'ahooks'
import { Button, Flex, Modal, Pagination, Table, Tag, Typography } from 'antd'
import Column from 'antd/es/table/Column'
import to from 'await-to-js'

const { Title } = Typography

// 获取列表数据
async function loadListData(params: ListDto) {
  const [error, trashData] = await to(loadQuestionTrashList(params))
  return error ? { total: 0, list: [] } : trashData.data
}

function Trash() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [modal, contextHolder] = Modal.useModal()
  const { data, loading, pagination } = usePagination(loadListData)

  const start = () => {
    pagination.onChange(1, 20)
    setTimeout(() => {
      setSelectedRowKeys([])
    }, 1000)
  }
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
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
      <Table loading={loading} pagination={false} dataSource={data?.list} rowSelection={rowSelection} rowKey="id">
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
      <div>

      </div>
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={data?.total}
        onChange={pagination.onChange}
        onShowSizeChange={pagination.onChange}
        showQuickJumper
        showSizeChanger
        style={{ marginTop: 16, justifyContent: 'flex-end' }}
      />
      {contextHolder}
    </>
  )
}
export default Trash
