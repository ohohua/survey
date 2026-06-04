import AnswerSheet from '@/components/AnswerSheet'
import ListSearch from '@/components/ListSearch'
import { useLoadQuestionList } from '@/hooks/useLoadingQuestionList'
import { Empty, Skeleton } from 'antd'
import s from './List.module.scss'

function List() {
  const { loading, questionList, run } = useLoadQuestionList()

  if (loading) {
    return <Skeleton active paragraph={{ rows: 6 }} />
  }

  return (
    <section className={s.page}>
      <div className={s.header}>
        <div>
          <h1>我的问卷</h1>
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
          : <Empty description="暂无问卷" />}
      </div>
    </section>
  )
}

export default List
