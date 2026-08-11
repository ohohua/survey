import { loadQuestionOverview } from '@/api'
import logo from '@/assets/star.png'
import { LOGIN_PATHNAME, MANAGE_INDEX_PATHNAME } from '@/router'
import { useAuthStore } from '@/store/useAuthStore'
import { ArrowRightOutlined, FormOutlined, LineChartOutlined, PlusOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { Button, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import s from './Home.module.scss'

function Home() {
  const nav = useNavigate()
  const { token } = useAuthStore()
  const { data, loading } = useRequest(loadQuestionOverview, {
    ready: !!token,
    refreshDeps: [token],
  })
  const overview = data?.data
  // const recentAnswerMax = Math.max(...(overview?.recentAnswerTrend.map(item => item.count) || [0]), 1)

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
            <strong>{token ? `${overview?.publishedRate ?? 0}%` : '--'}</strong>
          </div>
          <div className={s.previewSubTitle}>发布率</div>
          <div className={s.metricGrid}>
            <div>
              <FormOutlined />
              <span>今日问卷</span>
              <strong>{loading ? <Skeleton.Input active size="small" /> : token ? overview?.todayQuestionCount ?? 0 : '--'}</strong>
            </div>
            <div>
              <LineChartOutlined />
              <span>今日答卷</span>
              <strong>{loading ? <Skeleton.Input active size="small" /> : token ? overview?.todayAnswerCount ?? 0 : '--'}</strong>
            </div>
          </div>
          <div className={s.totalGrid}>
            <span>
              问卷总数
              <strong>{token ? overview?.totalQuestionCount ?? 0 : '--'}</strong>
            </span>
            <span>
              答卷总数
              <strong>{token ? overview?.totalAnswerCount ?? 0 : '--'}</strong>
            </span>
          </div>
          {/* <div className={s.bars}>
            {
              token
                ? overview?.recentAnswerTrend.map(item => (
                  <span
                    key={item.date}
                    title={`${item.date}: ${item.count}`}
                    style={{ width: `${Math.max((item.count / recentAnswerMax) * 100, item.count ? 12 : 4)}%` }}
                  />
                ))
                : <p>登录后查看你的真实概览</p>
            }
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Home
