import type { ComponentInfo } from '@/store/useComponentStore'
import type { MouseEvent } from 'react'
import { getComponentByType } from '@/components/Question'
import { useComponentStore } from '@/store/useComponentStore'
import clsx from 'clsx'
import s from './EditCanvas.module.scss'

function getComponent(componentInfo: ComponentInfo) {
  const { props, type } = componentInfo

  const componentConfig = getComponentByType(type)
  if (componentConfig == null)
    return null

  const { Component } = componentConfig
  return <Component {...props} />
}

function EditCanvas() {
  const { componentList, selectId, setSelectId } = useComponentStore()

  function handleClick(e: MouseEvent<HTMLDivElement>, id: string) {
    e.stopPropagation()
    setSelectId(id)
  }

  return (
    <>
      {
        componentList.map((c) => {
          const { id } = c
          const classNameWrapper = clsx({
            [s.component]: true,
            [s['select-component']]: selectId === id,
          })

          return (
            <div key={id} className={classNameWrapper} onClick={e => handleClick(e, id)}>
              {getComponent(c)}
            </div>
          )
        })
      }

    </>
  )
}

export default EditCanvas
