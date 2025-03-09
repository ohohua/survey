import { saveQuestionInfo, updateQuestionInfo } from '@/api'
import { TEMP_ID_PREFIX, useComponentStore } from '@/store'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'

export function useSaveQuestionInfo() {
  const { id = '' } = useParams()
  const { questionInfo, componentList } = useComponentStore()

  const components = componentList.map((item) => {
    if (item.id.includes(TEMP_ID_PREFIX)) {
      return { type: item.type, questionId: id, props: JSON.stringify(item.props) }
    }
    return { ...item, questionId: id, props: JSON.stringify(item.props) }
  })
  const params = { id, ...questionInfo, components }

  const { loading, run } = useRequest(async () => {
    const res = id ? await updateQuestionInfo(params) : saveQuestionInfo(params)

    return res
  }, {
    loadingDelay: 300,
    manual: true,
  })

  return { loading, run }
}
