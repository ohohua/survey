import type { ComponentConfigType } from '@/components/Question'
import { componentGroup, getComponentByType } from '@/components/Question'
import { useComponentStore } from '@/store'
import Title from 'antd/es/typography/Title'
import { nanoid } from 'nanoid'
import s from './Lib.module.scss'

function Lib() {
  const { addComponent } = useComponentStore()

  function getComponent(c: ComponentConfigType) {
    const { type, title, Component, defaultProps } = c

    function handleClick() {
      const component = getComponentByType(type)
      if (component) {
        addComponent({ id: nanoid(5), type, title, props: defaultProps })
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
