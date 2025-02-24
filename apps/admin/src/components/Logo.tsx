import logo from '@/assets/star.png'
import { HOME_PATHNAME } from '@/router'
import { Space, Typography } from 'antd'
import { Link } from 'react-router-dom'

function Logo() {
  const { Title } = Typography

  return (
    <>
      <Link to={HOME_PATHNAME} style={{ height: '64px', display: 'flex', alignItems: 'center' }}>
        <Space>
          <Title level={2} style={{ margin: 0 }}>
            <img src={logo} alt="logo" style={{ width: '50px', height: '50px' }} />
          </Title>
          <Title level={2} style={{ margin: 0 }}>
            Survey
          </Title>
        </Space>
      </Link>
    </>
  )
}

export default Logo
