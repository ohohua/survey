import { COMPONENT_TYPE } from '@survey/common'
import Component from './Component'
import { QuestionTitleDefault } from './interface'
import PropComponent from './PropComponent'

export * from './interface'

export default {
  type: COMPONENT_TYPE.TITLE,
  Component,
  PropComponent,
  defaultProps: QuestionTitleDefault,
}
