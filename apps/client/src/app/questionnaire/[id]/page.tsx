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
      body: JSON.stringify({ questionId: id, answers: payload }),
    })
    const result = await res.json()
    if (!res.ok || result.code !== 200) {
      throw new Error(result.msg || '提交失败')
    }
    setSubmitted(true)
    message.success('提交成功')
  }, {
    manual: true,
    onError: err => message.error(err.message || '提交失败'),
  })

  useEffect(() => {
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

  function renderComponent(c: ComponentInfo) {
    const props = parseProps(c)
    const commonTitle = props.title ? <Paragraph strong>{props.title}</Paragraph> : null
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

  const list = data.componentList.map(c => (
    <div key={c.id} className="mb-5 rounded bg-white/90 p-4 shadow-sm">
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
