import { useComponentStore } from '@/store'

export function useGetComponentInfo() {
  const { selectId, componentList } = useComponentStore()

  const selectedComponent = componentList.find(c => c.id === selectId)

  return { selectedComponent }
}
