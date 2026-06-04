import AnswerSheet from '@/components/AnswerSheet'
import ListSearch from '@/components/ListSearch'
import { useLoadQuestionStarList } from '@/hooks/useLoadingQuestionStarList'
import { Empty, Skeleton } from 'antd'
import s from './List.module.scss'

function Star() {
  const { loading, questionList, run } = useLoadQuestionStarList()

  if (loading) {
    return <Skeleton active paragraph={{ rows: 6 }} />
  }
  return (
    <section className={s.page}>
      <div className={s.header}>
        <div>
          <h1>星标问卷</h1>
          <p>
            共
            {' '}
            {questionList.length}
            {' '}
            份
          </p>
        </div>
        <ListSearch />
      </div>
      <div className={s.container}>
        {questionList.length
          ? questionList.map((answer) => {
              return <AnswerSheet key={answer.id} {...answer} onChange={run} />
            })
          : <Empty description="暂无星标问卷" />}
      </div>
    </section>
  )
}

export default Star
