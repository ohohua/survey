import { LeftOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import s from './StatHeader.module.scss'

function StatHeader() {
  const nav = useNavigate()
  function handleBack() {
    nav({ pathname: '/manage/list' })
  }
  return (
    <Flex className={s.header} justify="space-between" align="center">
      <div>
        <Button type="link" icon={<LeftOutlined />} onClick={handleBack}> 返回 </Button>
      </div>
      <Flex gap="small">
        <Button type="primary">编辑</Button>
      </Flex>
    </Flex>
  )
}

export default StatHeader
