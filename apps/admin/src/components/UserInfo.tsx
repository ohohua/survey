import { LOGIN_PATHNAME } from '@/router'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function UserInfo() {
  const { token } = useAuthStore()
  const nav = useNavigate()
  const handleLogin = () => {
    nav({ pathname: LOGIN_PATHNAME })
  }
  const handleLogout = () => {
    useAuthStore.getState().setToken('')
    nav({ pathname: LOGIN_PATHNAME })
  }

  return (
    <>
      {token
        ? <Button type="link" onClick={handleLogout}> 退出登录 </Button>
        : <Button type="link" onClick={handleLogin}> 登录 </Button>}
    </>
  )
}

export default UserInfo
