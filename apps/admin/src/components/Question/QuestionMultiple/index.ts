import { COMPONENT_TYPE } from '@survey/shared'
import Component from './Component'
import { QuestionMultipleDefault } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  type: COMPONENT_TYPE.MULTIPLE,
  Component, // 画布中的组件
  PropComponent, // 修改属性的组件
  defaultProps: QuestionMultipleDefault,
}
