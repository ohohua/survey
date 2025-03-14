import Component from './Component'
import { QuestionTitleDefault } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  type: 'componentTitle',
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefault,
}
