import { MANAGE_INDEX_PATHNAME } from '@/router'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import s from './Home.module.scss'

function Home() {
  const nav = useNavigate()

  const handleBegin = () => {
    nav({ pathname: MANAGE_INDEX_PATHNAME })
  }
  return (
    <>
      <div className={s.home}>
        <Button type="primary" onClick={handleBegin}>开始使用</Button>
      </div>
    </>
  )
}

export default Home
