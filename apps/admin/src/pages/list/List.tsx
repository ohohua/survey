import AnswerSheet from '@/components/AnswerSheet'

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
}]
function List() {
  const [questionList, _setQuestionList] = useState(rowQuestionList)

  return (
    <div>
      {questionList.map((answer) => {
        return <AnswerSheet key={answer.id} {...answer} />
      })}
    </div>
  )
}

export default List
