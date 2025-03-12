import { useSaveQuestionInfo } from '@/hooks/useSaveQuestionInfo'
import { TEMP_ID, useComponentStore } from '@/store'
import { CopyOutlined, DeleteOutlined, DownOutlined, LeftOutlined, LockOutlined, RedoOutlined, SnippetsOutlined, UndoOutlined, UnlockOutlined, UpOutlined } from '@ant-design/icons'
import { Button, Flex, message, Space, Tooltip } from 'antd'
import { cloneDeep } from 'lodash-es'
import { useNavigate } from 'react-router-dom'
import s from './EditHeader.module.scss'

function EditHeader() {
  const nav = useNavigate()
  const { selectId, componentList, tempComponent, setSelectId, delComponent, addComponent, updateComponent, setTempComponent, resetStore } = useComponentStore()
  const { loading, run, pubLoading, pubRun } = useSaveQuestionInfo()

  // 按钮状态
  function locked() {
    const component = componentList.find(c => c.id === selectId)
    return component ? component.props.isLock : false
  }
  function ableUp() {
    const index = componentList.findIndex(c => c.id === selectId)
    return index <= 0
  }
  function ableDown() {
    const index = componentList.findIndex(c => c.id === selectId)
    return index === componentList.length - 1
  }

  function handleLock() {
    const index = componentList.findIndex(item => item.id === selectId)
    if (index !== -1) {
      const component = componentList[index]
      updateComponent({ ...component, props: { ...component.props, isLock: !locked() } })
    }
  }
  function handleCopy() {
    if (selectId) {
      setTempComponent()
      message.success('复制成功')
    }
    else {
      message.warning('请先选中组件')
    }
  }
  function handlePaste() {
    if (tempComponent) {
      addComponent({ ...tempComponent, id: TEMP_ID() })
      message.success('粘贴成功')
    }
    else {
      message.warning('请先复制组件')
    }
  }
  function handleTurnUp() {
    if (!selectId) {
      return
    }
    const index = componentList.findIndex(c => c.id === selectId)
    if (index <= 0) {
      return
    }
    const currentComponent = cloneDeep(componentList[index])
    delComponent()
    addComponent(currentComponent, index - 1)
    setSelectId(currentComponent.id)
  }
  function handleTurnDown() {
    if (!selectId) {
      return
    }
    const index = componentList.findIndex(c => c.id === selectId)
    if (index === componentList.length - 1) {
      return
    }
    const currentComponent = cloneDeep(componentList[index])
    delComponent()
    addComponent(currentComponent, index + 1)
    setSelectId(currentComponent.id)
  }
  function handleUndo() { }
  function handleRedo() { }

  function handleBack() {
    resetStore()
    nav({ pathname: '/manage/list' })
  }

  return (
    <Flex className={s.header} justify="space-between" align="center">
      <div>
        <Button type="link" icon={<LeftOutlined />} onClick={handleBack}> 返回 </Button>
      </div>
      <Space>
        <Tooltip placement="top" title="删除">
          <Button shape="circle" icon={<DeleteOutlined />} onClick={delComponent} disabled={!selectId} />
        </Tooltip>
        <Tooltip placement="top" title={locked() ? '解锁' : '锁定'}>
          <Button shape="circle" icon={locked() ? <UnlockOutlined /> : <LockOutlined />} type={locked() ? 'primary' : 'default'} onClick={handleLock} disabled={!selectId} />
        </Tooltip>
        <Tooltip placement="top" title="复制">
          <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy} disabled={!selectId} />
        </Tooltip>
        <Tooltip placement="top" title="粘贴">
          <Button shape="circle" icon={<SnippetsOutlined />} onClick={handlePaste} disabled={!selectId} />
        </Tooltip>
        <Tooltip placement="top" title="上移">
          <Button shape="circle" icon={<UpOutlined />} onClick={handleTurnUp} disabled={!selectId || ableUp()} />
        </Tooltip>
        <Tooltip placement="top" title="下移">
          <Button shape="circle" icon={<DownOutlined />} onClick={handleTurnDown} disabled={!selectId || ableDown()} />
        </Tooltip>
        <Tooltip placement="top" title="撤回">
          <Button shape="circle" icon={<UndoOutlined />} onClick={handleUndo} />
        </Tooltip>
        <Tooltip placement="top" title="重做">
          <Button shape="circle" icon={<RedoOutlined />} onClick={handleRedo} />
        </Tooltip>
      </Space>
      <Flex gap="small">
        <Button type="default" onClick={run} loading={loading} disabled={loading}> 保存 </Button>
        <Button type="primary" onClick={pubRun} loading={pubLoading} disabled={pubLoading}> 发布 </Button>
      </Flex>
    </Flex>
  )
}

export default EditHeader
