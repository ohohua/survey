import { useSaveQuestionInfo } from '@/hooks/useSaveQuestionInfo'
import { LeftOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import s from './EditHeader.module.scss'

function EditHeader() {
  const nav = useNavigate()
  const { loading, run } = useSaveQuestionInfo()

  function handleBack() {
    nav({ pathname: '/manage/list' })
  }

  function handleSave() {
    run()
  }

  function handlePublish() { }
  return (
    <Flex className={s.header} justify="space-between" align="center">
      <div>
        <Button type="link" icon={<LeftOutlined />} onClick={handleBack}> 返回 </Button>
      </div>
      <div>z</div>
      <Flex gap="small">

        <Button type="default" onClick={handlePublish}> 发布 </Button>
        <Button type="primary" onClick={handleSave} loading={loading}> 保存 </Button>
      </Flex>
    </Flex>
  )
}

export default EditHeader
