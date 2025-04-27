import { CopyOutlined, LeftOutlined, QrcodeOutlined } from '@ant-design/icons'
import { Button, Flex, Input, message, Popover, QRCode } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import useClipboard from 'react-use-clipboard'
import s from './StatHeader.module.scss'

function StatHeader() {
  const nav = useNavigate()
  const { id = '' } = useParams()

  // 问卷移动端链接
  const mobileUrl = useMemo(() => `${import.meta.env.VITE_SERVICE_MOBILE_URL}/question/${id}`, [id])
  const [, setCopied] = useClipboard(mobileUrl)

  function handleBack() {
    nav({ pathname: '/manage/list' })
  }

  function handleCopy() {
    setCopied()
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
        <Input className={s.input} defaultValue={mobileUrl} placeholder="问卷链接" disabled />
        <Button style={{ flexShrink: 0 }} onClick={handleCopy} icon={<CopyOutlined />} />
        <Popover content={renderQrcode()} trigger="click">
          <Button style={{ flexShrink: 0 }} icon={<QrcodeOutlined />} />
        </Popover>
      </Flex>
      <Button type="default" onClick={handleEdit}>编辑</Button>
    </Flex>
  )
}

export default StatHeader
