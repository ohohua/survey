import type { ComponentInfo } from '@/store/useComponentStore'
import { getComponentByType } from '@/components/Question'
import { useComponentStore } from '@/store/useComponentStore'
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
  const { componentList } = useComponentStore()
  return (
    <>
      {
        componentList.map((c) => {
          const { id } = c
          return (
            <div key={id} className={s.component}>
              {getComponent(c)}
            </div>
          )
        })
      }

    </>
  )
}

export default EditCanvas
