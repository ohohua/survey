import { LeftOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import s from './EditHeader.module.scss'

function EditHeader() {
  const nav = useNavigate()

  function handleBack() {
    nav({ pathname: '/manage/list' })
  }

  return (
    <Flex className={s.header} justify="space-between" align="center">
      <div>
        <Button type="link" icon={<LeftOutlined />} onClick={handleBack}> 返回 </Button>
      </div>
      <div>z</div>
      <Flex gap="small">

        <Button type="default"> 发布 </Button>
        <Button type="primary"> 保存 </Button>
      </Flex>
    </Flex>
  )
}

export default EditHeader
