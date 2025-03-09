import type { ComponentConfigType } from '@/components/Question'
import { componentGroup, getComponentConfigByType } from '@/components/Question'
import { TEMP_ID, useComponentStore } from '@/store'
import Title from 'antd/es/typography/Title'
import { nanoid } from 'nanoid'
import s from './Lib.module.scss'

function Lib() {
  const { addComponent } = useComponentStore()

  function getComponent(c: ComponentConfigType) {
    const { type, Component, defaultProps } = c

    function handleClick() {
      const component = getComponentConfigByType(type)
      if (component) {
        addComponent({ id: TEMP_ID, type, props: defaultProps })
      }
    }

    return (
      <div className={s.wrapper} key={nanoid(5)} onClick={handleClick}>
        <Component />
      </div>
    )
  }

  return (
    <>
      {
        componentGroup.map((item) => {
          return (
            <div key={item.key}>
              <Title level={5}>{item.groupName}</Title>
              {
                item.components.map(c => getComponent(c))
              }
            </div>
          )
        })
      }
    </>
  )
}

export default Lib
