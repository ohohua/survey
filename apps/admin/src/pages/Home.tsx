import logo from '@/assets/star.png'
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/router'
import { useAuthStore } from '@/store/useAuthStore'
import { ArrowRightOutlined, FormOutlined, LineChartOutlined, PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import s from './Home.module.scss'

function Home() {
  const nav = useNavigate()
  const { token } = useAuthStore()

  const handleBegin = () => {
    if (token) {
      nav({ pathname: MANAGE_INDEX_PATHNAME })
    }
    else {
      nav({ pathname: LOGIN_PATHNAME })
    }
  }
  return (
    <div className={s.home}>
      <div className={s.panel}>
        <div className={s.copy}>
          <img className={s.logo} src={logo} alt="Survey" />
          <h1>Survey</h1>
          <p>问卷创建、投放和数据统计的管理工作台。</p>
          <div className={s.actions}>
            <Button type="primary" size="large" icon={token ? <ArrowRightOutlined /> : <PlusOutlined />} onClick={handleBegin}>
              {token ? '进入工作台' : '开始使用'}
            </Button>
          </div>
        </div>
        <div className={s.preview}>
          <div className={s.previewHeader}>
            <span>今日概览</span>
            <strong>86%</strong>
          </div>
          <div className={s.metricGrid}>
            <div>
              <FormOutlined />
              <span>问卷</span>
              <strong>24</strong>
            </div>
            <div>
              <LineChartOutlined />
              <span>答卷</span>
              <strong>1,286</strong>
            </div>
          </div>
          <div className={s.bars}>
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
