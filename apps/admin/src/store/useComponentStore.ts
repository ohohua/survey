import type { ComponentPropsType } from '@/components/Question'
import { create } from 'zustand'

export interface ComponentInfo {
  id: string
  type: string
  props: ComponentPropsType
}

export interface QuestionInfo {
  title: string
  backgroundImage?: string
  pageHeaderImage?: string
}
// 创建状态存储
interface ComponentListState {
  selectId: string // 被选中的组件
  questionInfo: QuestionInfo // 问卷基本信息
  componentList: ComponentInfo[] // 组件列表
  resetComponent: (componentList: ComponentInfo[]) => void
  addComponent: (component: ComponentInfo) => void
  delComponent: (id: string) => void
  updateComponent: (component: ComponentInfo) => void

  setSelectId: (id: string) => void

  setQuestionInfo: (info: QuestionInfo) => void
}

export const useComponentStore = create<ComponentListState>(set => ({
  selectId: '', // 被选中的 componentId
  questionInfo: {
    title: '',
    backgroundImage: undefined,
    pageHeaderImage: undefined,
  },
  componentList: [], // 问卷组件列表
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

  setSelectId: (id: string) => set(() => ({ selectId: id })),

  setQuestionInfo: (info: QuestionInfo) => set(state => Object.assign(state, info)),
}))
