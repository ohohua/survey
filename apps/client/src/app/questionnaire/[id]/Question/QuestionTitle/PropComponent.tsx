'use client'

import type { QuestionTitleProps } from './interface'
import { Checkbox, Form, Input, Select } from 'antd'
import { useEffect } from 'react'
import { QuestionTitleDefault } from './interface'

function PropComponent(props: QuestionTitleProps) {
  const [form] = Form.useForm()
  const { title, level, isCenter, isLock, onChange } = { ...QuestionTitleDefault, ...props }

  useEffect(() => {
    form.setFieldsValue({ title, level, isCenter })
  }, [title, level, isCenter])

  function handleChange() {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <>
      <Form layout="vertical" onValuesChange={handleChange} initialValues={{ title, level, isCenter }} form={form}>
        <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
          <Input disabled={isLock} />
        </Form.Item>
        <Form.Item label="层级" name="level">
          <Select
            disabled={isLock}
            options={[
              { label: '一级', value: 1 },
              { label: '二级', value: 2 },
              { label: '三级', value: 3 },
              { label: '四级', value: 4 },
              { label: '五级', value: 5 },
            ]}
          />
        </Form.Item>
        <Form.Item name="isCenter" valuePropName="checked">
          <Checkbox disabled={isLock}>是否居中</Checkbox>
        </Form.Item>
      </Form>
    </>
  )
}

export default PropComponent
