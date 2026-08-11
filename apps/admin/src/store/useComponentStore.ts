import type { ComponentPropsType } from '@/components/Question'
import { cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
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
  selectId?: string // 被选中的组件
  questionInfo: QuestionInfo // 问卷基本信息
  componentList: ComponentInfo[] // 组件列表
  tempComponent?: ComponentInfo // 复制组件存放之地

  resetStore: () => void
  resetComponent: (componentList: ComponentInfo[]) => void
  addComponent: (component: ComponentInfo, position?: number) => void
  delComponent: (id?: string) => void
  updateComponent: (component: ComponentInfo) => void
  moveComponent: (sourceIndex: number, targetIndex: number) => void

  setSelectId: (id: string) => void
  setSelectIdTurnUp: () => void
  setSelectIdTurnDown: () => void

  setQuestionInfo: (info: QuestionInfo) => void
  setTempComponent: () => void
}

// 新增的临时 id 的前缀，提交时候需要删除
export const TEMP_ID_PREFIX = 'temp_'
export const TEMP_ID = () => `${TEMP_ID_PREFIX}${nanoid(5)}`

export const useComponentStore = create<ComponentListState>(set => ({
  selectId: undefined, // 被选中的 componentId
  questionInfo: {
    title: '',
    backgroundImage: undefined,
    pageHeaderImage: undefined,
  },
  componentList: [], // 问卷组件列表
  tempComponent: undefined,

  resetStore: () => set(() => {
    return {
      selectId: undefined, // 被选中的 componentId
      questionInfo: {
        title: '',
        backgroundImage: undefined,
        pageHeaderImage: undefined,
      },
      componentList: [], // 问卷组件列表
      tempComponent: undefined,
    }
  }),
  // 组件列表
  resetComponent: componentList => set(() => ({ componentList })),
  addComponent: (component, position) => set((state) => {
    // 没传下标，直接在末尾添加
    if (position !== 0 && !position) {
      return { componentList: [...state.componentList, component] }
    }
    // 在下标处添加
    const newComponentList = cloneDeep(state.componentList)
    newComponentList.splice(position, 0, component)
    return { componentList: newComponentList }
  }),
  delComponent: id => set((state) => {
    const deleteId = id || state.selectId
    if (!deleteId) {
      return state
    }
    const pos = state.componentList.findIndex(component => component.id === deleteId)
    if (pos < 0) {
      return state
    }
    // 处理删除后的选中 selectId
    let nextSelectId = state.selectId
    if (state.selectId === deleteId && state.componentList.length > 1) {
      const list = state.componentList
      nextSelectId = pos < list.length - 1 ? list[pos + 1].id : list[pos - 1].id
    }
    else if (state.selectId === deleteId) {
      nextSelectId = ''
    }
    const newComponentList = [...state.componentList]
    newComponentList.splice(pos, 1)
    return {
      componentList: newComponentList,
      selectId: nextSelectId,
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
  moveComponent: (sourceIndex, targetIndex) => set((state) => {
    const { componentList } = state
    if (
      sourceIndex === targetIndex
      || sourceIndex < 0
      || targetIndex < 0
      || sourceIndex >= componentList.length
      || targetIndex >= componentList.length
    ) {
      return state
    }

    const newComponentList = cloneDeep(componentList)
    const [sourceComponent] = newComponentList.splice(sourceIndex, 1)
    newComponentList.splice(targetIndex, 0, sourceComponent)
    return { componentList: newComponentList }
  }),

  // selectId 相关
  // 激活组件
  setSelectId: (id: string) => set(() => ({ selectId: id })),
  setSelectIdTurnUp: () => set((state) => {
    const index = state.componentList.findIndex(c => c.id === state.selectId)
    if (index <= 0) {
      const len = state.componentList.length
      return { selectId: state.componentList[len - 1].id }
    }
    return { selectId: state.componentList[index - 1].id }
  }),
  setSelectIdTurnDown: () => set((state) => {
    const index = state.componentList.findIndex(c => c.id === state.selectId)
    if (index === -1 || index === state.componentList.length - 1) {
      return { selectId: state.componentList[0].id }
    }
    return { selectId: state.componentList[index + 1].id }
  }),
  // 问卷信息
  setQuestionInfo: (info: QuestionInfo) => set(state => ({ questionInfo: { ...state.questionInfo, ...info } })),
  // 复制问卷
  setTempComponent: () => set((state) => {
    if (!state.selectId) {
      return {}
    }
    const index = state.componentList.findIndex(c => c.id === state.selectId)
    return {
      tempComponent: { ...cloneDeep(state.componentList[index]), id: TEMP_ID() },
    }
  }),
}))
