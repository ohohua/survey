import type { QuestionInfo } from '@/api/question.d'
import { loadQuestionList } from '@/api'
import { SEARCH_KEYWORD } from '@/constant'
import { useRequest } from 'ahooks'
import { useSearchParams } from 'react-router-dom'

export function useLoadQuestionList() {
  const [searchParams] = useSearchParams()
  const [questionList, setQuestionList] = useState<QuestionInfo[]>([])

  const { data, error, loading, run } = useRequest(async () => {
    const params = {
      pageIndex: 1,
      pageSize: 10,
    }

    const { data } = await loadQuestionList({ ...params, title: searchParams.get(SEARCH_KEYWORD) || '' })

    return data
  }, {
    loadingDelay: 300,
    manual: true,
  })

  useEffect(() => {
    if (data) {
      setQuestionList(data.list)
    }
  }, [data])

  useEffect(() => {
    run()
  }, [searchParams.get(SEARCH_KEYWORD)])

  return { loading, error, questionList, run }
}
