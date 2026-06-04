import { useSaveQuestionInfo } from '@/hooks/useSaveQuestionInfo'
import { DeleteOutlined, PlusCircleOutlined, StarOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import s from './ManageLayout.module.scss'

function ManageLayout() {
  const nav = useNavigate()
  const { pathname } = useLocation()
  const { run, data } = useSaveQuestionInfo()

  useEffect(() => {
    if (data?.code === 200 && data.data) {
      nav({ pathname: `/question/edit/${data.data}` })
    }
  }, [data])

  return (
    <div className={s.container}>
      <aside className={s.aside}>
        <Button className={s.create} type="primary" size="large" icon={<PlusCircleOutlined />} onClick={run}>新建问卷</Button>
        <nav className={s.nav}>
          <Button className={s.navItem} onClick={() => nav('/manage/list')} size="large" type={pathname.includes('list') ? 'primary' : 'text'} icon={<UnorderedListOutlined />}>我的问卷</Button>
          <Button className={s.navItem} onClick={() => nav('/manage/star')} size="large" type={pathname.includes('star') ? 'primary' : 'text'} icon={<StarOutlined />}>星标问卷</Button>
          <Button className={s.navItem} onClick={() => nav('/manage/trash')} size="large" type={pathname.includes('trash') ? 'primary' : 'text'} icon={<DeleteOutlined />}>回收站</Button>
        </nav>
      </aside>
      <div className={s.manage}>
        <Outlet />
      </div>
    </div>
  )
}

export default ManageLayout
