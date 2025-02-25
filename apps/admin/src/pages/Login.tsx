import type { FormProps } from 'antd'
import { REGISTER_PATHNAME } from '@/router'
import { Button, Flex, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import s from './Register.module.scss'

interface FieldType {
  username?: string
  password?: string
}

const onFinish: FormProps<FieldType>['onFinish'] = (_values) => {
  // console.log('Success:', values)
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (_errorInfo) => {
  // console.log('Failed:', errorInfo)
}

const Login: React.FC = () => {
  return (
    <div className={s.container}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="账号"
          name="username"
          rules={[
            { required: true, message: '请输入账号' },
            { type: 'string', min: 5, max: 20, message: '长度应在5-20范围内' },
            { pattern: /^\w+$/, message: '只能包含字母、数字、下划线' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Flex justify="space-between">
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Link to={`/${REGISTER_PATHNAME}`}>没有账号，去注册</Link>
          </Flex>
        </Form.Item>
      </Form>
    </div>

  )
}

export default Login
