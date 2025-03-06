import Component from './Component'
import { QuestionTitleDefault } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  title: '标题',
  type: 'componentTitle',
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefault,
}
