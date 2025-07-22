import type { ListDto } from '@survey/http'
import { deleteQuestionTrash, loadQuestionTrashList, restoreQuestionTrash } from '@/api'
import ListSearch from '@/components/ListSearch'
import { usePagination } from 'ahooks'
import { Button, Flex, message, Modal, Pagination, Table, Tag, Typography } from 'antd'
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
  const { data, loading, pagination, run } = usePagination(loadListData)

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const hasSelected = selectedRowKeys.length > 0

  const handleRecover = (id?: string) => {
    const ids = id || selectedRowKeys.join(',')
    // 恢复
    modal.confirm({
      content: '确定恢复吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        const [error, res] = await to(restoreQuestionTrash(ids))
        if (error) {
          return message.error('恢复失败')
        }
        if (res) {
          message.success('恢复成功')
          run({ current: 1, pageSize: 20 })
        }
      },
    })
  }

  const handleDelete = (id?: string) => {
    modal.confirm({
      content: '确定删除吗？',
      okText: '确定',
      cancelText: '取消',
      onOk: async () => {
        const ids = id || selectedRowKeys.join(',')
        const [error, res] = await to(deleteQuestionTrash(ids))
        if (error) {
          return message.error('删除失败')
        }
        if (res) {
          message.success('删除成功')
          run({ current: 1, pageSize: 20 })
        }
      },
    })
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
        <Button type="primary" onClick={() => handleRecover()} disabled={!hasSelected} loading={loading}>
          批量恢复
        </Button>
        <Button type="primary" danger onClick={() => handleDelete()} disabled={!hasSelected} loading={loading}>
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
          render={(_, record) => (
            <>
              <Button type="link" onClick={() => handleRecover(record.id)}>恢复</Button>
              <Button type="link" danger onClick={() => handleDelete(record.id)}>删除</Button>
            </>
          )}
        />
      </Table>

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
