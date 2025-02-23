import logo from '@/assets/star.png'
import { Layout } from 'antd'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import { Outlet } from 'react-router-dom'
import s from './MainLayout.module.scss'

function MainLayout() {
  return (
    <Layout style={{ backgroundColor: '#fff' }}>
      <Header className={s.header}>
        <img src={logo} alt="logo" />
        <h3>survey</h3>
      </Header>
      <Content className={s.content}>
        <Outlet></Outlet>
      </Content>
      <Footer className={s.footer}>Footer</Footer>
    </Layout>
  )
}

export default MainLayout
