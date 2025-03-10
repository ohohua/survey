import Component from './Component'
import { QuestionTextareaDefault } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  type: 'componentTextarea',
  Component, // 画布中的组件
  PropComponent, // 修改属性的组件
  defaultProps: QuestionTextareaDefault,
}
