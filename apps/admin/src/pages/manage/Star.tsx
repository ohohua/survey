import ListSearch from '@/components/ListSearch'
import { Flex, Typography } from 'antd'

const { Title } = Typography

function Star() {
  return (
    <>
      <Title level={3}>
        <Flex justify="space-between">
          <span>星标问卷</span>
          <ListSearch></ListSearch>
        </Flex>
      </Title>
    </>
  )
}

export default Star
