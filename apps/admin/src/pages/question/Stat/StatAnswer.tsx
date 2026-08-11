import type { AnswerStatVo } from '@/api'
import type { ComponentInfo } from '@/store'
import type { ComponentType } from '@survey/shared'
import { COMPONENT_TYPE } from '@survey/shared'
import { Empty, List, Progress, Space, Table, Typography } from 'antd'
import s from './index.module.scss'

const { Text, Title } = Typography

interface StatAnswerProps {
  list: ComponentInfo[]
  selectId: string | undefined
  loading: boolean
  changeId: (id: string) => void
  stat?: AnswerStatVo
  pagination: { current: number, pageSize: number }
  onPaginationChange: (pagination: { current: number, pageSize: number }) => void
}

const needComponentColumnType = [COMPONENT_TYPE.INPUT, COMPONENT_TYPE.RADIO, COMPONENT_TYPE.MULTIPLE, COMPONENT_TYPE.TEXTAREA]
function StatAnswer(props: StatAnswerProps) {
  const { list, selectId, loading, changeId, stat, pagination, onPaginationChange } = props
  const selectedSummary = stat?.summaries.find(item => item.componentId === selectId)
  const selectedComponent = list.find(item => item.id === selectId)

  const filterColumns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: 80,
    },
    {
      title: '提交时间',
      dataIndex: 'createAt',
      width: 180,
      render: (value: string) => value ? new Date(value).toLocaleString() : '-',
    },
    ...list.filter(item => needComponentColumnType.includes(item.type as ComponentType)).map((c) => {
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
        dataIndex: ['answers', c.id],
        ellipsis: true,
        render: (value: string) => value || '-',
      }
    }),
  ]

  function renderSummary() {
    if (!selectId || !selectedSummary || !selectedComponent) {
      return <Empty description="选择左侧题目查看详情" />
    }

    if ([COMPONENT_TYPE.RADIO, COMPONENT_TYPE.MULTIPLE].includes(selectedComponent.type as ComponentType)) {
      return (
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={5}>{selectedSummary.title}</Title>
          {selectedSummary.options.length
            ? selectedSummary.options.map(option => (
                <div key={option.value}>
                  <Text>
                    {option.label}
                    {' '}
                    (
                    {option.count}
                    )
                  </Text>
                  <Progress percent={option.percent} size="small" />
                </div>
              ))
            : <Empty description="暂无选项数据" />}
        </Space>
      )
    }

    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Title level={5}>{selectedSummary.title}</Title>
        <List
          size="small"
          dataSource={selectedSummary.answers}
          locale={{ emptyText: '暂无回答' }}
          renderItem={item => (
            <List.Item>
              <Space direction="vertical" size={0}>
                <Text>{item.content || '-'}</Text>
                <Text type="secondary">{item.createAt ? new Date(item.createAt).toLocaleString() : '-'}</Text>
              </Space>
            </List.Item>
          )}
        />
      </Space>
    )
  }

  const columns = filterColumns.map((column) => {
    return {
      ...column,
      title: (
        column.title
      ),
    }
  })

  if (loading) {
    return <>loading</>
  }

  return (
    <div className={s.center}>
      <Table
        columns={columns}
        dataSource={stat?.list || []}
        rowKey="submitId"
        scroll={{ x: true }}
        pagination={{
          current: pagination.current,
          pageSize: pagination.pageSize,
          total: stat?.total || 0,
          showSizeChanger: true,
          onChange: (current, pageSize) => onPaginationChange({ current, pageSize }),
        }}
      />
      <div className={s.summary}>
        {renderSummary()}
      </div>
    </div>
  )
}

export default memo(StatAnswer)
