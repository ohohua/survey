import type { FormProps } from 'antd'
import { getPublicKey, register } from '@/api'
import logo from '@/assets/star.png'
import { LOGIN_PATHNAME } from '@/router'
import { useAuthStore } from '@/store/useAuthStore'
import { encryptWithPublicKey } from '@/utils/encrypt'
import { BarChartOutlined, CheckSquareOutlined, FileTextOutlined, LockOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Flex, Form, Input, message } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const { setToken } = useAuthStore()
  const { run, loading } = useRequest(async (values) => {
    try {
      const resp = await getPublicKey()
      const encryptedPassword = encryptWithPublicKey(values.password!, resp.data.publicKey)
      if (!encryptedPassword) {
        throw new Error('密码加密失败')
      }
      const payload = {
        username: values.username,
        nickname: values.nickname,
        password: encryptedPassword,
      }
      const respLogin = await register(payload)
      const token = respLogin.data.token
      if (token) {
        setToken(token)
        message.success('注册成功')
        navigate('/')
      }
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
    <div className={`${s.container} ${s.loginContainer}`}>
      <section className={s.loginShowcase}>
        <div className={s.showcaseBrand}>
          <img src={logo} alt="Survey" />
          <span>Survey</span>
        </div>
        <div className={s.surveyVisual} aria-hidden="true">
          <div className={s.visualDocument}>
            <FileTextOutlined className={s.visualMainIcon} />
            <span />
            <span />
            <span />
          </div>
          <div className={s.visualBadge}>
            <CheckSquareOutlined />
          </div>
          <div className={s.visualChart}>
            <BarChartOutlined />
          </div>
        </div>
        <div className={s.showcaseNotes}>
          <span>快速创建</span>
          <span>统一管理</span>
          <span>结果追踪</span>
        </div>
      </section>
      <div className={s.authCard}>
        <div className={s.authHeader}>
          <img src={logo} alt="Survey" />
          <h1>注册</h1>
          <p>填写基础信息，创建你的管理账号。</p>
        </div>
        <Form
          layout="vertical"
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
            <Input prefix={<UserOutlined />} placeholder="请输入账号" size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" size="large" />
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
            <Input.Password prefix={<LockOutlined />} placeholder="请再次输入密码" size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input prefix={<SmileOutlined />} placeholder="请输入昵称" size="large" />
          </Form.Item>

          <Form.Item label={null}>
            <Flex className={s.formFooter} justify="space-between" align="center">
              <Button type="primary" htmlType="submit" loading={loading} size="large">
                注册
              </Button>
              <Link to={`/${LOGIN_PATHNAME}`}>已有账号，去登录</Link>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Register
