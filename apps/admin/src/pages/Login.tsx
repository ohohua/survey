import type { FormProps } from 'antd'
import { getPublicKey, login } from '@/api'
import logo from '@/assets/star.png'
import { REGISTER_PATHNAME } from '@/router'
import { useAuthStore } from '@/store/useAuthStore'
import { encryptWithPublicKey } from '@/utils/encrypt'
import { useRequest } from 'ahooks'
import { Button, Flex, Form, Input, message } from 'antd'
import React from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import s from './Register.module.scss'

interface FieldType {
  username?: string
  password?: string
}

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (_errorInfo) => {
  // console.log('Failed:', errorInfo)
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { setToken } = useAuthStore()
  const { run, loading } = useRequest(async (values) => {
    const resp = await getPublicKey()
    const payload = {
      ...values,
      password: encryptWithPublicKey(values.password!, resp.data.publicKey),
    }
    const respLogin = await login(payload as any)
    const token = respLogin.data.token
    if (token) {
      message.success('登录成功')
      setToken(token)
      const from = searchParams.get('from')
      navigate(from?.startsWith('/') ? from : '/')
      return respLogin
    }
  }, {
    manual: true,
  })

  return (
    <div className={`${s.container} ${s.loginContainer}`}>
      <section className={s.loginShowcase}>
        <div className={s.showcaseBrand}>
          <img src={logo} alt="Survey" />
          <span>Survey Admin</span>
        </div>
        <div className={s.showcaseCopy}>
          <h1>把问卷管理变成一件清楚的事</h1>
          <p>创建、投放、回收、统计都收在同一个工作台里。</p>
        </div>
        <div className={s.showcaseBoard}>
          <div className={s.boardHeader}>
            <span>本周数据</span>
            <strong>+18.6%</strong>
          </div>
          <div className={s.boardRows}>
            <span />
            <span />
            <span />
          </div>
          <div className={s.boardMetrics}>
            <div>
              <span>问卷</span>
              <strong>32</strong>
            </div>
            <div>
              <span>答卷</span>
              <strong>2,418</strong>
            </div>
            <div>
              <span>完成率</span>
              <strong>86%</strong>
            </div>
          </div>
        </div>
      </section>
      <div className={s.authCard}>
        <div className={s.authHeader}>
          <img src={logo} alt="Survey" />
          <h1>登录 Survey</h1>
          <p>欢迎回来，请登录后继续管理你的问卷。</p>
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
            <Input placeholder="请输入账号" />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item label={null}>
            <Flex justify="space-between" align="center">
              <Button type="primary" htmlType="submit" loading={loading}>
                登录
              </Button>
              <Link to={`/${REGISTER_PATHNAME}`}>没有账号，去注册</Link>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </div>

  )
}

export default Login
