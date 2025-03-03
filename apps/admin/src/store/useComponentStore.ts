import type { ComponentPropsType } from '@/components/Question'
import { create } from 'zustand'

export interface ComponentInfo {
  id: string
  type: string
  title: string
  props: ComponentPropsType
}
// 创建状态存储
interface ComponentListState {
  componentList: ComponentInfo[]
  resetComponent: (componentList: ComponentInfo[]) => void
  addComponent: (component: ComponentInfo) => void
  delComponent: (id: string) => void
  updateComponent: (component: ComponentInfo) => void
}

export const useComponentStore = create<ComponentListState>(set => ({
  componentList: [],
  resetComponent: componentList => set(() => ({ componentList })),
  addComponent: component => set(state => ({ componentList: [...state.componentList, component] })),
  delComponent: id => set((state) => {
    const pos = state.componentList.findIndex(component => component.id === id)
    const newComponentList = [...state.componentList]
    newComponentList.splice(pos, 1)
    return {
      componentList: newComponentList,
    }
  }),
  updateComponent: component => set((state) => {
    return {
      componentList: state.componentList.map((item) => {
        if (item.id === component.id) {
          return component
        }
        return item
      }),
    }
  }),
}))
