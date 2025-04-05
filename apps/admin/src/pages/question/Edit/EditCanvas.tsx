import type { MouseEvent } from 'react'
import { useBindCanvasKeyPress } from '@/hooks/useBindCanvasKeyPress'
import { useComponentStore } from '@/store/useComponentStore'
import clsx from 'clsx'
import s from './EditCanvas.module.scss'
import { getComponent } from './GetComponent'

function EditCanvas() {
  const { componentList, selectId, questionInfo, setSelectId } = useComponentStore()

  // 注册键盘快捷键
  useBindCanvasKeyPress()

  function handleClick(e: MouseEvent<HTMLDivElement>, id: string) {
    e.stopPropagation()
    setSelectId(id)
  }

  return (
    <div className={s.container}>
      {
        questionInfo.pageHeaderImage && (<img src={questionInfo.pageHeaderImage} alt="header" />)
      }
      {
        componentList.map((c) => {
          const { id, props } = c
          const classNameWrapper = clsx({
            [s.component]: true,
            [s['select-component']]: selectId === id,
            [s.locked]: props.isLock,
          })

          return (
            <div key={id} className={classNameWrapper} onClick={e => handleClick(e, id)}>
              {getComponent(c)}
            </div>
          )
        })
      }

    </div>
  )
}

export default EditCanvas
