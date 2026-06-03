import type { answer, component, options, question, user } from '../../schema/src'

/**
 * @description: 问卷组件类型
 */
export const COMPONENT_TYPE = {
  TITLE: 'componentTitle',
  INPUT: 'componentInput',
  PARAGRAPH: 'componentParagraph',
  TEXTAREA: 'componentTextarea',
  RADIO: 'componentRadio',
  MULTIPLE: 'componentMultiple',
}

export type ComponentType = (typeof COMPONENT_TYPE)[keyof typeof COMPONENT_TYPE]

export type Answer = typeof answer.$inferSelect
export type NewAnswer = typeof answer.$inferInsert

export type Component = typeof component.$inferSelect
export type NewComponent = typeof component.$inferInsert

export type Option = typeof options.$inferSelect
export type NewOption = typeof options.$inferInsert

export type Question = typeof question.$inferSelect
export type NewQuestion = typeof question.$inferInsert

export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert
