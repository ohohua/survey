import { saveQuestionInfo, updateQuestionInfo } from '@/api'
import { TEMP_ID_PREFIX, useComponentStore } from '@/store'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'

export function useSaveQuestionInfo() {
  const { id = '' } = useParams()
  const { questionInfo, componentList } = useComponentStore()

  const components = componentList.map((item, index) => {
    if (item.id.includes(TEMP_ID_PREFIX)) {
      const { id, ...rest } = item
      return { ...rest, sort: index, questionId: id, props: JSON.stringify(item.props) }
    }
    return { ...item, sort: index, questionId: id, props: JSON.stringify(item.props) }
  })
  const params = { id, ...questionInfo, components }

  const { loading, run } = useRequest(async () => {
    return id ? await updateQuestionInfo(params) : saveQuestionInfo(params)
  }, {
    loadingDelay: 300,
    manual: true,
  })

  return { loading, run }
}
