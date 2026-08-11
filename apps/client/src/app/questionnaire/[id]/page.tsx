'use client'

import type { ComponentInfo } from './Question/GetComponent'
import { COMPONENT_TYPE } from '@survey/shared'
import { useRequest } from 'ahooks'
import { Button, Checkbox, Empty, Flex, Input, message, Radio, Result, Skeleton, Space, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import { getComponent } from './Question/GetComponent'

const { Paragraph } = Typography

interface Props {
  params: Promise<{ id: string }>
}

type AnswerValue = string | string[]

const ANSWER_COMPONENT_TYPES = [
  COMPONENT_TYPE.INPUT,
  COMPONENT_TYPE.TEXTAREA,
  COMPONENT_TYPE.RADIO,
  COMPONENT_TYPE.MULTIPLE,
]
const RESPONDENT_ID_KEY = 'survey_respondent_id'
const submittedKey = (questionId: string) => `survey_submitted_${questionId}`
const RESPONDENT_ID_LENGTH = 10

function parseProps(component: ComponentInfo) {
  if (typeof component.props === 'string') {
    try {
      return JSON.parse(component.props)
    }
    catch {
      return {}
    }
  }
  return component.props || {}
}

const Question: React.FC<Props> = ({ params }) => {
  const { id } = use(params)
  const [data, setData] = useState<{
    title: string
    backgroundImage: string
    pageHeaderImage: string
    componentList: ComponentInfo[]
  } | null>(null)
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})
  const [submitted, setSubmitted] = useState(false)
  const [respondentId, setRespondentId] = useState('')

  function getRespondentId() {
    const cachedId = window.localStorage.getItem(RESPONDENT_ID_KEY)
    if (cachedId && cachedId.length <= RESPONDENT_ID_LENGTH) {
      return cachedId
    }
    const nextId = (cachedId || `${Date.now()}${Math.random().toString(36).slice(2)}`)
      .replace(/\W/g, '')
      .slice(0, RESPONDENT_ID_LENGTH)
    window.localStorage.setItem(RESPONDENT_ID_KEY, nextId)
    return nextId
  }

  async function fetchData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/client/question/${id}`)
    const result = await res.json()
    if (!res.ok || result.code !== 200) {
      throw new Error(result.msg || '问卷加载失败')
    }
    const data = {
      ...result.data,
      componentList: result.data.componentList.map((item: ComponentInfo) => ({
        ...item,
        props: parseProps(item),
      })),
    }
    setData(data)
  }

  const { run, loading, error } = useRequest(fetchData, {
    manual: true,
  })
  const { run: submit, loading: submitLoading } = useRequest(async () => {
    if (!respondentId) {
      message.error('答题人信息初始化失败，请刷新后重试')
      return
    }

    const missingComponent = data?.componentList.find((component) => {
      const props = parseProps(component)
      if (props.isHidden || !props.isRequired || !ANSWER_COMPONENT_TYPES.includes(component.type as any)) {
        return false
      }
      return isEmptyAnswer(answers[component.id])
    })

    if (missingComponent) {
      const props = parseProps(missingComponent)
      message.warning(`请填写「${props.title || '必填题'}」`)
      document.getElementById(`question-${missingComponent.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    const payload = Object.entries(answers)
      .map(([componentId, value]) => ({
        componentId,
        content: Array.isArray(value) ? JSON.stringify(value) : value,
      }))
      .filter(item => item.content.length > 0 && item.content !== '[]')

    if (!payload.length) {
      message.warning('请至少填写一道题')
      return
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/client/answer/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ questionId: id, respondentId, answers: payload }),
    })
    const result = await res.json()
    if (!res.ok || result.code !== 200) {
      if (result.msg === '你已经提交过该问卷') {
        window.localStorage.setItem(submittedKey(id), '1')
        setSubmitted(true)
        return
      }
      throw new Error(result.msg || '提交失败')
    }
    window.localStorage.setItem(submittedKey(id), '1')
    setSubmitted(true)
    message.success('提交成功')
  }, {
    manual: true,
    onError: err => message.error(err.message || '提交失败'),
  })

  useEffect(() => {
    setRespondentId(getRespondentId())
    setSubmitted(window.localStorage.getItem(submittedKey(id)) === '1')
    run()
  }, [id])

  if (error) {
    return <Result status="warning" title={error.message || '问卷加载失败'} />
  }

  if (loading || !data) {
    return (
      <Space direction="vertical" size={16} className="max-w-2xl p-4 w-full">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </Space>
    )
  }

  if (submitted) {
    return <Result status="success" title="提交成功" subTitle="感谢你的填写" />
  }

  function updateAnswer(componentId: string, value: AnswerValue) {
    setAnswers(prev => ({ ...prev, [componentId]: value }))
  }

  function isEmptyAnswer(value?: AnswerValue) {
    if (Array.isArray(value)) {
      return value.length === 0
    }
    return !`${value ?? ''}`.trim()
  }

  function renderTitle(title?: string, isRequired?: boolean) {
    if (!title) {
      return null
    }
    return (
      <Paragraph strong>
        {isRequired ? <span className="mr-1 text-red-500">*</span> : null}
        {title}
      </Paragraph>
    )
  }

  function renderComponent(c: ComponentInfo) {
    const props = parseProps(c)
    const commonTitle = renderTitle(props.title, props.isRequired)
    const verticalStyle: React.CSSProperties = props.vertical ? { display: 'flex', flexDirection: 'column', gap: 8 } : {}

    if (c.type === COMPONENT_TYPE.INPUT) {
      return (
        <>
          {commonTitle}
          <Input value={answers[c.id] as string || ''} placeholder={props.placeholder} onChange={e => updateAnswer(c.id, e.target.value)} />
        </>
      )
    }
    if (c.type === COMPONENT_TYPE.TEXTAREA) {
      return (
        <>
          {commonTitle}
          <TextArea value={answers[c.id] as string || ''} placeholder={props.placeholder} autoSize={{ minRows: 3, maxRows: 6 }} onChange={e => updateAnswer(c.id, e.target.value)} />
        </>
      )
    }
    if (c.type === COMPONENT_TYPE.RADIO) {
      return (
        <>
          {commonTitle}
          <Radio.Group value={answers[c.id] as string} options={props.options} style={verticalStyle} onChange={e => updateAnswer(c.id, e.target.value)} />
        </>
      )
    }
    if (c.type === COMPONENT_TYPE.MULTIPLE) {
      return (
        <>
          {commonTitle}
          <Checkbox.Group value={answers[c.id] as string[] || []} options={props.options} style={verticalStyle} onChange={value => updateAnswer(c.id, value.map(String))} />
        </>
      )
    }

    return getComponent({ ...c, props })
  }

  const list = data.componentList.filter(c => !parseProps(c).isHidden).map(c => (
    <div key={c.id} id={`question-${c.id}`} className="mb-5 scroll-mt-6 rounded bg-white/90 p-4 shadow-sm">
      {renderComponent(c)}
    </div>
  ))

  return (
    <Flex
      className="min-h-screen w-full max-w-2xl bg-cover bg-center"
      style={data.backgroundImage ? { backgroundImage: `url(${data.backgroundImage})` } : {}}
      vertical
    >
      {data.pageHeaderImage ? <Image src={data.pageHeaderImage} alt={data.title} width={750} height={240} priority className="h-auto w-full" /> : null}
      <div className="flex-1 p-4">
        {list.length ? list : <Empty description="暂无题目" />}
      </div>
      <Flex justify="center" align="center" className="sticky bottom-0 h-16 bg-white/95 px-4" component="footer">
        <Button loading={submitLoading} disabled={submitLoading} type="primary" className="w-2/3" onClick={submit}>提交</Button>
      </Flex>
    </Flex>
  )
}

export default Question
