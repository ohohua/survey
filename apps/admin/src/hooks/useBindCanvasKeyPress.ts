import { TEMP_ID, useComponentStore } from '@/store'
import { useKeyPress } from 'ahooks'
import { message } from 'antd'

export function useBindCanvasKeyPress() {
  const { selectId, tempComponent, delComponent, addComponent, setTempComponent, setSelectIdTurnUp, setSelectIdTurnDown } = useComponentStore()

  useKeyPress('delete', () => {
    delComponent()
  })

  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (selectId) {
      setTempComponent()
      message.success('复制成功')
    }
    else {
      message.warning('请先选中组件')
    }
  })

  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (tempComponent) {
      addComponent({ ...tempComponent, id: TEMP_ID() })
      message.success('粘贴成功')
    }
    else {
      message.warning('请先复制组件')
    }
  })

  // 选中上一个
  useKeyPress('uparrow', () => {
    setSelectIdTurnUp()
  })

  // 选中下一个
  useKeyPress('downarrow', () => {
    setSelectIdTurnDown()
  })
}
