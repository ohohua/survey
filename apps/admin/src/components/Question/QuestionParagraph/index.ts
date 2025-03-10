import Component from './Component'
import { QuestionParagraphDefault } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  type: 'componentParagraph',
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefault,
}
