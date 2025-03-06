import { loadQuestionInfo } from '@/api'
import { useComponentStore } from '@/store'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'

export function useLoadQuestionData() {
  const { id = '' } = useParams()
  const componentStore = useComponentStore()

  const { data, error, loading, run } = useRequest(async () => {
    if (!id)
      throw new Error('没有问卷id')
    const { data } = await loadQuestionInfo(id)
    return data
  }, {
    loadingDelay: 300,
    manual: true,
  })

  useEffect(() => {
    if (!data)
      return
    componentStore.resetComponent(data.componentList)
  }, [data])

  useEffect(() => {
    run()
  }, [id])

  return { loading, error }
}
