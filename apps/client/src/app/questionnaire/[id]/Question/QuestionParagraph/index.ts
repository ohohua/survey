import { COMPONENT_TYPE } from '@survey/shared'
import Component from './Component'
import { QuestionParagraphDefault } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  type: COMPONENT_TYPE.PARAGRAPH,
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefault,
}
