import { BadRequestException, Inject, Injectable } from '@nestjs/common'
import { answer, component, createId, question } from '@survey/schema'
import { COMPONENT_TYPE, ComponentType } from '@survey/shared'
import { and, asc, eq, inArray, sql } from 'drizzle-orm'
import { DB, DbType } from '../global/providers/db.provider'
import { SubmitAnswerDto } from './model/answer.dto'

const ANSWER_COMPONENT_TYPES: ComponentType[] = [
  COMPONENT_TYPE.INPUT,
  COMPONENT_TYPE.TEXTAREA,
  COMPONENT_TYPE.RADIO,
  COMPONENT_TYPE.MULTIPLE,
]

interface ComponentProps {
  title?: string
  options?: Array<{ label: string, value: string }>
}

@Injectable()
export class AnswerService {
  constructor() {}

  @Inject(DB)
  private db: DbType

  async submitAnswer(dto: SubmitAnswerDto) {
    const { questionId, answers } = dto
    const questionList = await this.db
      .select({
        id: question.id,
        isPublished: question.isPublished,
        isDeleted: question.isDeleted,
      })
      .from(question)
      .where(eq(question.id, questionId))

    if (!questionList.length || questionList[0].isDeleted) {
      throw new BadRequestException('问卷不存在')
    }
    if (!questionList[0].isPublished) {
      throw new BadRequestException('问卷未发布')
    }

    const componentList = await this.db
      .select({
        id: component.id,
        type: component.type,
      })
      .from(component)
      .where(and(eq(component.questionId, questionId), eq(component.isDeleted, false)))

    const answerableComponentIds = new Set(
      componentList
        .filter(item => ANSWER_COMPONENT_TYPES.includes(item.type as ComponentType))
        .map(item => item.id),
    )

    const normalizedAnswers = answers
      .map(item => ({
        componentId: item.componentId,
        content: this.normalizeContent(item.content),
      }))
      .filter(item => answerableComponentIds.has(item.componentId) && item.content.length > 0)

    if (!normalizedAnswers.length) {
      throw new BadRequestException('请至少填写一道题')
    }

    const submitId = createId()
    const userId = submitId

    await this.db.transaction(async (tx) => {
      await tx.insert(answer).values(normalizedAnswers.map(item => ({
        userId,
        submitId,
        questionId,
        componentId: item.componentId,
        content: item.content,
      })))

      await tx
        .update(question)
        .set({ answerCount: sql`${question.answerCount} + 1` })
        .where(eq(question.id, questionId))
    })

    return { submitId }
  }

  async loadAnswerStat(questionId: string, current = 1, pageSize = 20) {
    const safeCurrent = Number.isFinite(current) && current > 0 ? current : 1
    const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 20
    const offset = (safeCurrent - 1) * safePageSize

    const questionList = await this.db
      .select({ id: question.id })
      .from(question)
      .where(and(eq(question.id, questionId), eq(question.isDeleted, false)))

    if (!questionList.length) {
      throw new BadRequestException('问卷不存在')
    }

    const componentList = await this.db
      .select({
        id: component.id,
        type: component.type,
        props: component.props,
        sort: component.sort,
      })
      .from(component)
      .where(and(eq(component.questionId, questionId), eq(component.isDeleted, false)))
      .orderBy(asc(component.sort))

    const answerableComponents = componentList.filter(item => ANSWER_COMPONENT_TYPES.includes(item.type as ComponentType))
    const propsMap = answerableComponents.reduce<Record<string, ComponentProps>>((map, item) => {
      map[item.id] = this.parseProps(item.props) as ComponentProps
      return map
    }, {})

    const submitRows = await this.db
      .select({
        submitId: answer.submitId,
        createAt: sql<Date>`MIN(${answer.createAt})`,
        total: sql<number>`COUNT(*) OVER()`,
      })
      .from(answer)
      .where(eq(answer.questionId, questionId))
      .groupBy(answer.submitId)
      .orderBy(sql`MIN(${answer.createAt}) DESC`)
      .limit(safePageSize)
      .offset(offset)

    const submitIds = submitRows.map(item => item.submitId)
    const answerRows = submitIds.length
      ? await this.db
        .select({
          submitId: answer.submitId,
          componentId: answer.componentId,
          content: answer.content,
          createAt: answer.createAt,
        })
        .from(answer)
        .where(and(eq(answer.questionId, questionId), inArray(answer.submitId, submitIds)))
      : []
    const summaryAnswerRows = await this.db
      .select({
        submitId: answer.submitId,
        componentId: answer.componentId,
        content: answer.content,
        createAt: answer.createAt,
      })
      .from(answer)
      .where(eq(answer.questionId, questionId))

    const rows = submitRows.map((submitRow, index) => {
      const answersMap = answerRows
        .filter(item => item.submitId === submitRow.submitId)
        .reduce<Record<string, string>>((map, item) => {
          map[item.componentId] = this.displayContent(item.content, propsMap[item.componentId])
          return map
        }, {})

      return {
        key: submitRow.submitId,
        submitId: submitRow.submitId,
        index: offset + index + 1,
        createAt: submitRow.createAt,
        answers: answersMap,
      }
    })

    const summaries = answerableComponents.map((item) => {
      const props = propsMap[item.id] || {}
      const relatedAnswers = summaryAnswerRows.filter(row => row.componentId === item.id)
      const optionStats = (props.options || []).map((option) => {
        const count = relatedAnswers.filter((row) => {
          const values = this.parseAnswerValues(row.content)
          return values.includes(option.value)
        }).length

        return {
          label: option.label,
          value: option.value,
          count,
          percent: relatedAnswers.length ? Math.round((count / relatedAnswers.length) * 100) : 0,
        }
      })

      return {
        componentId: item.id,
        title: props.title || '未命名题目',
        type: item.type,
        answers: relatedAnswers.map(row => ({
          submitId: row.submitId,
          content: this.displayContent(row.content, props),
          createAt: row.createAt,
        })),
        options: optionStats,
      }
    })

    return {
      list: rows,
      total: submitRows.length ? Number(submitRows[0].total) : 0,
      summaries,
    }
  }

  private normalizeContent(content: string) {
    return `${content ?? ''}`.trim()
  }

  private parseProps(props: unknown) {
    if (!props) {
      return {}
    }
    if (typeof props === 'string') {
      try {
        return JSON.parse(props)
      }
      catch {
        return {}
      }
    }
    return props
  }

  private parseAnswerValues(content: string | null) {
    if (!content) {
      return []
    }
    try {
      const value = JSON.parse(content)
      return Array.isArray(value) ? value : [String(value)]
    }
    catch {
      return [content]
    }
  }

  private displayContent(content: string | null, props?: ComponentProps) {
    const values = this.parseAnswerValues(content)
    const optionMap = new Map((props?.options || []).map(option => [option.value, option.label]))
    return values.map(value => optionMap.get(value) || value).join('、')
  }
}
