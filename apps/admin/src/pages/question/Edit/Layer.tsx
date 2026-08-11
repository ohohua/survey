import type { ComponentInfo } from '@/store'
import type { MouseEvent } from 'react'
import { useComponentStore } from '@/store'
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  ToTopOutlined,
  UnlockOutlined,
  VerticalAlignBottomOutlined,
} from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import clsx from 'clsx'
import s from './Layer.module.scss'

const componentNameMap: Record<string, string> = {
  componentTitle: '标题',
  componentParagraph: '段落',
  componentInput: '输入框',
  componentTextarea: '文本域',
  componentRadio: '单选',
  componentMultiple: '多选',
}

function getComponentTitle(component: ComponentInfo) {
  const { type, props } = component
  return props.title || props.content || componentNameMap[type] || '未命名组件'
}

function Layer() {
  const {
    componentList,
    selectId,
    setSelectId,
    updateComponent,
    moveComponent,
    delComponent,
  } = useComponentStore()

  function updateLayerProps(component: ComponentInfo, props: Partial<ComponentInfo['props']>) {
    updateComponent({
      ...component,
      props: {
        ...component.props,
        ...props,
      },
    })
  }

  function handleAction(e: MouseEvent, action: () => void) {
    e.stopPropagation()
    action()
  }

  if (!componentList.length) {
    return <div className={s.empty}>暂无组件</div>
  }

  return (
    <div className={s.container}>
      {componentList.map((component, index) => {
        const { id, type, props } = component
        const isSelected = selectId === id
        const isHidden = !!props.isHidden
        const isLock = !!props.isLock
        const className = clsx(s.item, {
          [s.selected]: isSelected,
          [s.disabled]: isHidden,
        })

        return (
          <div key={id} className={className} onClick={() => setSelectId(id)}>
            <div className={s.content}>
              <div className={s.title}>{getComponentTitle(component)}</div>
              <div className={s.meta}>{componentNameMap[type] || type}</div>
            </div>
            <div className={s.actions}>
              <Tooltip title="移到顶部">
                <Button
                  type="text"
                  size="small"
                  icon={<ToTopOutlined />}
                  disabled={index === 0}
                  onClick={e => handleAction(e, () => moveComponent(index, 0))}
                />
              </Tooltip>
              <Tooltip title="上移">
                <Button
                  type="text"
                  size="small"
                  icon={<ArrowUpOutlined />}
                  disabled={index === 0}
                  onClick={e => handleAction(e, () => moveComponent(index, index - 1))}
                />
              </Tooltip>
              <Tooltip title="下移">
                <Button
                  type="text"
                  size="small"
                  icon={<ArrowDownOutlined />}
                  disabled={index === componentList.length - 1}
                  onClick={e => handleAction(e, () => moveComponent(index, index + 1))}
                />
              </Tooltip>
              <Tooltip title="移到底部">
                <Button
                  type="text"
                  size="small"
                  icon={<VerticalAlignBottomOutlined />}
                  disabled={index === componentList.length - 1}
                  onClick={e => handleAction(e, () => moveComponent(index, componentList.length - 1))}
                />
              </Tooltip>
              <Tooltip title={isHidden ? '显示' : '隐藏'}>
                <Button
                  type="text"
                  size="small"
                  icon={isHidden ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                  onClick={e => handleAction(e, () => updateLayerProps(component, { isHidden: !isHidden }))}
                />
              </Tooltip>
              <Tooltip title={isLock ? '解锁' : '锁定'}>
                <Button
                  type="text"
                  size="small"
                  icon={isLock ? <LockOutlined /> : <UnlockOutlined />}
                  onClick={e => handleAction(e, () => updateLayerProps(component, { isLock: !isLock }))}
                />
              </Tooltip>
              <Tooltip title="删除">
                <Button
                  danger
                  type="text"
                  size="small"
                  icon={<DeleteOutlined />}
                  onClick={e => handleAction(e, () => delComponent(id))}
                />
              </Tooltip>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Layer
