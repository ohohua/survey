import { getComponentByType } from '@/components/Question'
import { useGetComponentInfo } from '@/hooks/useGetComponentInfo'

function NoContent() {
  return <div style={{ textAlign: 'center' }}> 未选中组件 </div>
}

function Prop() {
  const { selectedComponent } = useGetComponentInfo()

  if (!selectedComponent) {
    return <NoContent />
  }
  const { type, props } = selectedComponent
  const componentConfig = getComponentByType(type)

  if (!componentConfig) {
    return <NoContent />
  }
  const { PropComponent } = componentConfig

  return <PropComponent {...props} />
}

export default Prop
