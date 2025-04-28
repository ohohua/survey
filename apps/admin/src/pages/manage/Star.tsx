import AnswerSheet from '@/components/AnswerSheet'
import ListSearch from '@/components/ListSearch'
import { useLoadQuestionStarList } from '@/hooks/useLoadingQuestionStarList'
import { Flex, Typography } from 'antd'
import s from './List.module.scss'

const { Title } = Typography

function Star() {
  const { loading, questionList, run } = useLoadQuestionStarList()

  if (loading) {
    return <>loading</>
  }
  return (
    <>
      <Title level={3}>
        <Flex justify="space-between">
          <span>星标问卷</span>
          <ListSearch></ListSearch>
        </Flex>
      </Title>
      <div className={s.container}>
        {questionList.map((answer) => {
          return <AnswerSheet key={answer.id} {...answer} onChange={run} />
        })}
      </div>
    </>
  )
}

export default Star
