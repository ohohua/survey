import type { FC } from 'react'
import type { QuestionInputProps } from './QuestionInput'
import type { QuestionTitleProps } from './QuestionTitle'
import QuestionInput from './QuestionInput'
import QuestionTitle from './QuestionTitle'

// 各个组件的 props 类型
export type ComponentPropsType = QuestionInputProps | QuestionTitleProps

// 组件类型
export interface ComponentConfigType {
  title: string
  type: string
  Component: FC<ComponentPropsType>
  defaultProps: ComponentPropsType
}

// 全部组件构成的列表
export const componentList: ComponentConfigType[] = [QuestionInput, QuestionTitle]

// 根据type获取组件
export const getComponentByType = (type: string) => componentList.find(c => c.type === type)
