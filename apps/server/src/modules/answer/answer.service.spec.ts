import { BadRequestException } from '@nestjs/common'
import { COMPONENT_TYPE } from '@survey/shared'
import { AnswerService } from './answer.service'

function queryResult<T>(result: T) {
  const chain: any = {
    from: jest.fn(() => chain),
    where: jest.fn(() => chain),
    orderBy: jest.fn(() => chain),
    groupBy: jest.fn(() => chain),
    limit: jest.fn(() => chain),
    offset: jest.fn(() => chain),
    then: (resolve: (value: T) => void, reject: (error: unknown) => void) => Promise.resolve(result).then(resolve, reject),
  }

  return chain
}

describe('answerService', () => {
  function createService(db: any) {
    const service = new AnswerService()
    ;(service as any).db = db
    return service
  }

  it('rejects answers for unpublished questionnaires', async () => {
    const service = createService({
      select: jest.fn(() => queryResult([{ id: 'q1', isPublished: false, isDeleted: false }])),
    })

    await expect(service.submitAnswer({
      questionId: 'q1',
      answers: [{ componentId: 'c1', content: 'hello' }],
    })).rejects.toThrow(BadRequestException)
  })

  it('rejects answers for components that do not belong to the questionnaire', async () => {
    const service = createService({
      select: jest.fn()
        .mockReturnValueOnce(queryResult([{ id: 'q1', isPublished: true, isDeleted: false }]))
        .mockReturnValueOnce(queryResult([{ id: 'c1', type: COMPONENT_TYPE.INPUT }])),
    })

    await expect(service.submitAnswer({
      questionId: 'q1',
      answers: [{ componentId: 'other', content: 'hello' }],
    })).rejects.toThrow(BadRequestException)
  })

  it('writes one submit group and increments the questionnaire answer count', async () => {
    const insertValues = jest.fn(() => Promise.resolve())
    const updateWhere = jest.fn(() => Promise.resolve())
    const tx = {
      insert: jest.fn(() => ({ values: insertValues })),
      update: jest.fn(() => ({ set: jest.fn(() => ({ where: updateWhere })) })),
    }
    const db = {
      select: jest.fn()
        .mockReturnValueOnce(queryResult([{ id: 'q1', isPublished: true, isDeleted: false }]))
        .mockReturnValueOnce(queryResult([
          { id: 'c1', type: COMPONENT_TYPE.INPUT },
          { id: 'c2', type: COMPONENT_TYPE.MULTIPLE },
        ])),
      transaction: jest.fn(async (callback: (tx: any) => Promise<void>) => callback(tx)),
    }
    const service = createService(db)

    const result = await service.submitAnswer({
      questionId: 'q1',
      answers: [
        { componentId: 'c1', content: 'Alice' },
        { componentId: 'c2', content: '["a","b"]' },
      ],
    })

    expect(result.submitId).toBeDefined()
    expect(insertValues).toHaveBeenCalledWith(expect.arrayContaining([
      expect.objectContaining({ questionId: 'q1', componentId: 'c1', content: 'Alice', submitId: result.submitId }),
      expect.objectContaining({ questionId: 'q1', componentId: 'c2', content: '["a","b"]', submitId: result.submitId }),
    ]))
    expect(updateWhere).toHaveBeenCalled()
  })

  it('groups answers by submit id and builds option summaries', async () => {
    const db = {
      select: jest.fn()
        .mockReturnValueOnce(queryResult([{ id: 'q1' }]))
        .mockReturnValueOnce(queryResult([
          {
            id: 'c1',
            type: COMPONENT_TYPE.RADIO,
            props: JSON.stringify({
              title: '单选题',
              options: [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }],
            }),
            sort: 0,
          },
        ]))
        .mockReturnValueOnce(queryResult([
          { submitId: 's1', createAt: new Date('2026-01-01T00:00:00Z'), total: 1 },
        ]))
        .mockReturnValueOnce(queryResult([
          { submitId: 's1', componentId: 'c1', content: 'a', createAt: new Date('2026-01-01T00:00:00Z') },
        ]))
        .mockReturnValueOnce(queryResult([
          { submitId: 's1', componentId: 'c1', content: 'a', createAt: new Date('2026-01-01T00:00:00Z') },
        ])),
    }
    const service = createService(db)

    const stat = await service.loadAnswerStat('q1')

    expect(stat.total).toBe(1)
    expect(stat.list[0].answers.c1).toBe('A')
    expect(stat.summaries[0].title).toBe('单选题')
    expect(stat.summaries[0].options).toEqual([
      { label: 'A', value: 'a', count: 1, percent: 100 },
      { label: 'B', value: 'b', count: 0, percent: 0 },
    ])
  })
})
