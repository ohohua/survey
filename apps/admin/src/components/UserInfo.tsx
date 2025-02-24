import { LOGIN_PATHNAME } from '@/router'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

function UserInfo() {
  const nav = useNavigate()
  const handleLogin = () => {
    nav({ pathname: LOGIN_PATHNAME })
  }

  return (
    <>
      <Button type="link" onClick={handleLogin}> 登录 </Button>
    </>
  )
}

export default UserInfo
