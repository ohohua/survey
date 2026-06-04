import { LOGIN_PATHNAME, REGISTER_PATHNAME } from '@/router'
import { useAuthStore } from '@/store/useAuthStore'
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import s from './UserInfo.module.scss'

function UserInfo() {
  const { token } = useAuthStore()
  const nav = useNavigate()
  const { pathname } = useLocation()
  const isAuthPage = pathname === `/${LOGIN_PATHNAME}` || pathname === `/${REGISTER_PATHNAME}`
  const handleLogin = () => {
    nav({ pathname: LOGIN_PATHNAME })
  }
  const handleLogout = () => {
    useAuthStore.getState().setToken('')
    nav({ pathname: LOGIN_PATHNAME })
  }

  return (
    <div className={s.user}>
      {token
        ? <Button icon={<LogoutOutlined />} onClick={handleLogout}>退出登录</Button>
        : !isAuthPage && <Button type="primary" icon={<LoginOutlined />} onClick={handleLogin}>登录</Button>}
    </div>
  )
}

export default UserInfo
