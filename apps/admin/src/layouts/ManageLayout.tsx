import { DeleteOutlined, PlusCircleOutlined, StarOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Button, Divider } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import s from './ManageLayout.module.scss'

function ManageLayout() {
  const nav = useNavigate()
  const { pathname } = useLocation()

  return (
    <div className={s.container}>
      <aside className={s.aside}>
        <Button type="primary" size="large" icon={<PlusCircleOutlined />}>新建问卷</Button>
        <Divider></Divider>
        <Button onClick={() => nav('/manage/list')} size="large" type={pathname.includes('list') ? 'default' : 'text'} icon={<UnorderedListOutlined />}>我的问卷</Button>
        <Button onClick={() => nav('/manage/star')} size="large" type={pathname.includes('star') ? 'default' : 'text'} icon={<StarOutlined />}>星标问卷</Button>
        <Button onClick={() => nav('/manage/trash')} size="large" type={pathname.includes('trash') ? 'default' : 'text'} icon={<DeleteOutlined />}>回收站</Button>
      </aside>
      <div className={s.manage}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default ManageLayout
