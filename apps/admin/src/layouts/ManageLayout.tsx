import { Outlet } from 'react-router-dom'
import s from './ManageLayout.module.scss'

function ManageLayout() {
  return (
    <div className={s.container}>
      <aside className={s.aside}> aside </aside>
      <div className={s.manage}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default ManageLayout
