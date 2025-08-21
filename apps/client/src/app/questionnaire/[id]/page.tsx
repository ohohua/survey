'use client'

import type { ComponentInfo } from './Question/GetComponent'
import { useRequest } from 'ahooks'
import { Button, Flex, Skeleton, Space } from 'antd'
import Image from 'next/image'
import React, { use, useEffect, useState } from 'react'
import { getComponent } from './Question/GetComponent'

interface Props {
  params: Promise<{ id: string }>
}

const Question: React.FC<Props> = ({ params }) => {
  const { id } = use(params)
  const [data, setData] = useState<{
    backgroundImage: string
    pageHeaderImage: string
    componentList: ComponentInfo[]
  } | null>(null)

  async function fetchData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/question/${id}`)
    const { data } = await res.json()
    setData(data)
  }
  const { run, loading } = useRequest(fetchData)

  useEffect(() => {
    run()
  }, [id])

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

  const list = data.componentList.map(c => (
    <div key={c.id}>
      {getComponent(c)}
    </div>
  ))

  return (
    <Flex
      className="h-screen w-full bg-cover bg-center max-w-2xl opacity-80"
      style={{ backgroundImage: `url(${data.backgroundImage})` }}
      vertical
    >
      <Image src={data.pageHeaderImage} alt="bg" width={200} height={100} priority className="w-full" />
      <div className="p-4 flex-1">{list}</div>
      <Flex justify="center" align="center" className="h-14" component="footer">
        <Button loading={loading} type="primary" variant="outlined" className="w-2/3">提交</Button>
      </Flex>
    </Flex>
  )
}

export default Question
