import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { Button, Flex, Input, message, Popover } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import s from './StatHeader.module.scss'

function StatHeader() {
  const nav = useNavigate()
  const { id = '' } = useParams()

  function handleBack() {
    nav({ pathname: '/manage/list' })
  }

  function handleCopy() {
    message.success('复制成功')
  }

  function handleEdit() {
    nav({ pathname: `/question/edit/${id}` })
  }

  function renderQrcode() {
    return <div className={s.qrcode}></div>
  }
  return (
    <Flex className={s.header} justify="space-between" align="center">
      <Button type="link" icon={<LeftOutlined />} onClick={handleBack}> 返回 </Button>
      <Flex gap="small">
        <Input addonAfter={<CopyOutlined onClick={handleCopy} />} placeholder="问卷链接" />
        <Popover content={renderQrcode()} trigger="click">
          <Button style={{ flexShrink: 0 }} icon={<QrcodeOutlined />} />
        </Popover>
      </Flex>
      <Button type="primary" onClick={handleEdit}>编辑</Button>
    </Flex>
  )
}

export default StatHeader
