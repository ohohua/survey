import type { ComponentPropsType } from '@/components/Question'
import { getComponentConfigByType } from '@/components/Question'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'
import { useComponentStore } from '@/store'

function NoContent() {
  return <div style={{ textAlign: 'center' }}> 未选中组件 </div>
}

function Prop() {
  const { selectedComponent } = useGetComponentInfo()
  const { updateComponent } = useComponentStore()

  if (!selectedComponent) {
    return <NoContent />
  }
  const { type, props, id } = selectedComponent
  const componentConfig = getComponentConfigByType(type)

  if (!componentConfig) {
    return <NoContent />
  }
  const { PropComponent } = componentConfig

  function newPropsChange(newProps: ComponentPropsType) {
    if (!selectedComponent) {
      return
    }

    updateComponent({
      id,
      type,
      props: newProps,
    })
  }

  return <PropComponent {...props} onChange={newPropsChange} />
}

export default Prop
