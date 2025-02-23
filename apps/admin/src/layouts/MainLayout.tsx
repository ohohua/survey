import { Outlet } from 'react-router-dom'

function MainLayout() {
  return (
    <>
      <div> header </div>
      <div>
        <Outlet></Outlet>
      </div>
      <div>footer</div>
    </>
  )
}

export default MainLayout
