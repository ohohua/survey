import Component from './Component'
import { QuestionTitleDefault } from './interface'

export * from './interface'

export default {
  title: '标题',
  type: 'componentTitle',
  Component,
  defaultProps: QuestionTitleDefault,
}
