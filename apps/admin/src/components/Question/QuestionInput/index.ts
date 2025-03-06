import Component from './Component'
import { QuestionInputDefault } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '输入框',
  type: 'componentInput',
  Component, // 画布中的组件
  PropComponent, // 修改属性的组件
  defaultProps: QuestionInputDefault,
}
