import AnswerSheet from '@/components/AnswerSheet'
import ListSearch from '@/components/ListSearch'
import { Flex, Typography } from 'antd'

const rowQuestionList = [{
  id: 1,
  title: 'Question 1',
  isPublished: true,
  answerNumber: 10,
  createAt: '2021-09-01',
  isStar: true,
}, {
  id: 2,
  title: 'Question 2',
  isPublished: false,
  answerNumber: 20,
  createAt: '2021-09-02',
  isStar: false,
}, {
  id: 3,
  title: 'Question 2',
  isPublished: false,
  answerNumber: 20,
  createAt: '2021-09-02',
  isStar: false,
}, {
  id: 4,
  title: 'Question 2',
  isPublished: false,
  answerNumber: 20,
  createAt: '2021-09-02',
  isStar: false,
}, {
  id: 5,
  title: 'Question 2',
  isPublished: false,
  answerNumber: 20,
  createAt: '2021-09-02',
  isStar: false,
}, {
  id: 6,
  title: 'Question 2',
  isPublished: false,
  answerNumber: 20,
  createAt: '2021-09-02',
  isStar: false,
}]
const { Title } = Typography

function List() {
  const [questionList, _setQuestionList] = useState(rowQuestionList)

  return (
    <div>
      <Title level={3}>
        <Flex justify="space-between">
          <span>我的问卷</span>
          <ListSearch></ListSearch>
        </Flex>
      </Title>
      {questionList.map((answer) => {
        return <AnswerSheet key={answer.id} {...answer} />
      })}
    </div>
  )
}

export default List
