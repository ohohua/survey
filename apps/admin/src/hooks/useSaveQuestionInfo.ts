import { publishQuestion, saveQuestionInfo, updateQuestionInfo } from '@/api'
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

  // 保存或更新问卷
  const { data, loading, run } = useRequest(async () => {
    return id ? await updateQuestionInfo(params) : saveQuestionInfo(params)
  }, {
    loadingDelay: 300,
    manual: true,
  })

  // 发布问卷
  const { data: pubData, loading: pubLoading, run: pubRun } = useRequest(async () => {
    let questionId
    if (id) {
      questionId = id
    }
    else {
      const res = await saveQuestionInfo(params)
      questionId = res.data
    }
    const res = await publishQuestion(questionId)
    if (res.code === 200) {
      message.success('发布成功')
    }
    return res
  }, {
    loadingDelay: 300,
    manual: true,
  })

  // 绑定保存快捷键
  useKeyPress(['ctrl.s', 'meta.s'], (e: KeyboardEvent) => {
    e.preventDefault()
    if (!loading) {
      run()
    }
  })

  // 自动保存
  // useDebounceEffect(() => {
  //   run()
  // }, [questionInfo, componentList], {
  //   wait: 1000 * 5,
  // })

  useEffect(() => {
    if (data && data.code === 200) {
      message.success(data.msg)
    }
  }, [data])
  return { loading, run, data, pubLoading, pubRun, pubData }
}
