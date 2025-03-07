import type { FC } from 'react'
import type { QuestionInputProps } from './QuestionInput'
import type { QuestionTitleProps } from './QuestionTitle'
import QuestionInput from './QuestionInput'
import QuestionTitle from './QuestionTitle'

// 各个组件的 props 类型
export type ComponentPropsType = QuestionInputProps | QuestionTitleProps

// 组件类型
export interface ComponentConfigType {
  type: string
  Component: FC<ComponentPropsType>
  PropComponent: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部组件构成的列表，渲染组件时候使用
export const componentList: ComponentConfigType[] = [QuestionInput, QuestionTitle]

// 组件库
export const componentGroup = [
  {
    groupName: '文本显示',
    key: 'text',
    components: [QuestionTitle],
  },
  {
    groupName: '用户输入',
    key: 'input',
    components: [QuestionInput],
  },
  {
    groupName: '用户选择',
    key: 'select',
    components: [],
  },
]

// 根据type获取组件: Component || PropComponent
export const getComponentConfigByType = (type: string) => componentList.find(c => c.type === type)
