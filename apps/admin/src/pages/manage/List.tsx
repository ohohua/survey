import AnswerSheet from '@/components/AnswerSheet'
import ListSearch from '@/components/ListSearch'
import { useLoadQuestionList } from '@/hooks/useLoadingQuestionList'
import { Flex, Typography } from 'antd'
import s from './List.module.scss'

const { Title } = Typography

function List() {
  const { loading, questionList, run } = useLoadQuestionList()

  if (loading) {
    return <>loading</>
  }

  return (
    <div>
      <Title level={3}>
        <Flex justify="space-between">
          <span>我的问卷</span>
          <ListSearch></ListSearch>
        </Flex>
      </Title>
      <div className={s.container}>
        {questionList.map((answer) => {
          return <AnswerSheet key={answer.id} {...answer} onChange={run} />
        })}
      </div>
    </div>
  )
}

export default List
