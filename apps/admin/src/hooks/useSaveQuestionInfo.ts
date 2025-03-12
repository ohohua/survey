import { saveQuestionInfo, updateQuestionInfo } from '@/api'
import { TEMP_ID_PREFIX, useComponentStore } from '@/store'
import { useKeyPress, useRequest } from 'ahooks'
import { message } from 'antd'
import { useParams } from 'react-router-dom'

export function useSaveQuestionInfo() {
  const { id = '' } = useParams()
  const { questionInfo, componentList } = useComponentStore()

  const components = componentList.map((item, index) => {
    if (item.id.includes(TEMP_ID_PREFIX)) {
      const { id: componentId, ...rest } = item
      return { ...rest, sort: index, questionId: id, props: JSON.stringify(item.props) }
    }
    return { ...item, sort: index, questionId: id, props: JSON.stringify(item.props) }
  })
  const params = { id, ...questionInfo, components }

  const { data, loading, run } = useRequest(async () => {
    return id ? await updateQuestionInfo(params) : saveQuestionInfo(params)
  }, {
    loadingDelay: 300,
    manual: true,
  })

  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault()
    if (!loading) {
      run()
    }
  })

  useEffect(() => {
    if (data && data.code === 200) {
      message.success(data.data)
    }
  }, [data])
  return { loading, run }
}
