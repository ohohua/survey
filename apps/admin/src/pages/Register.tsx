import type { FormProps } from 'antd'
import { getPublicKey, register } from '@/api'
import { LOGIN_PATHNAME } from '@/router'
import { encryptWithPublicKey } from '@/utils/encrypt'
import { useRequest } from 'ahooks'
import { Button, Flex, Form, Input, message } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import s from './Register.module.scss'

interface FieldType {
  username?: string
  password?: string
  rePassword?: string
  nickname?: string
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (_errorInfo) => {
  // console.log('Failed:', errorInfo)
}

const Register: React.FC = () => {
  const { run, loading } = useRequest(async (values) => {
    try {
      const resp = await getPublicKey()
      const payload = {
        ...values,
        password: encryptWithPublicKey(values.password!, resp.data.publicKey),
      }
      const respLogin = await register(payload as any)
      message.success('注册成功，请登录')
      return respLogin
    }
    catch (error: any) {
      message.error(error?.response?.data?.message || '注册失败')
      throw error
    }
  }, {
    manual: true,
  })

  return (
    <div className={s.container}>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={run}
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

        <Form.Item<FieldType>
          label="确认密码"
          name="rePassword"
          dependencies={['password']}
          rules={[
            { required: true, message: '请再次输入密码' },
            ({ getFieldValue }) => {
              const password = getFieldValue('password')
              return {
                validator(_rule, value) {
                  if (!value || value === password) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致'))
                },
              }
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="昵称"
          name="nickname"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={null}>
          <Flex justify="space-between" align="center">
            <Button type="primary" htmlType="submit" loading={loading}>
              注册
            </Button>
            <Link to={`/${LOGIN_PATHNAME}`}>已有账号，去登录</Link>
          </Flex>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Register
