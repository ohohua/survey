import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { Button, Flex, Input, message, Popover, QRCode } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import s from './StatHeader.module.scss'

function StatHeader() {
  const nav = useNavigate()
  const { id = '' } = useParams()

  // 问卷移动端链接
  const mobileUrl = useMemo(() => `${import.meta.env.VITE_SERVICE_MOBILE_URL}/question/${id}`, [id])

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
    return (
      <QRCode value={mobileUrl} bordered={false} />
    )
  }
  return (
    <Flex className={s.header} justify="space-between" align="center">
      <Button type="link" icon={<LeftOutlined />} onClick={handleBack}> 返回 </Button>
      <Flex gap="small">
        <Input className={s.input} addonAfter={<CopyOutlined onClick={handleCopy} />} defaultValue={mobileUrl} placeholder="问卷链接" />
        <Popover content={renderQrcode()} trigger="click">
          <Button style={{ flexShrink: 0 }} icon={<QrcodeOutlined />} />
        </Popover>
      </Flex>
      <Button type="default" onClick={handleEdit}>编辑</Button>
    </Flex>
  )
}

export default StatHeader
