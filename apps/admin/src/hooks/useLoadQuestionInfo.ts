import type { ComponentPropsType } from '@/components/Question'
import { loadQuestionInfo } from '@/api'
import { useComponentStore } from '@/store'
import { useRequest } from 'ahooks'
import { useParams } from 'react-router-dom'

export function useLoadQuestionData() {
  const { id = '' } = useParams()
  const { setSelectId, resetComponent, setQuestionInfo } = useComponentStore()

  const { data, error, loading, run } = useRequest(async () => {
    if (!id) {
      throw new Error('没有问卷id')
    }
    const { data } = await loadQuestionInfo(id)
    return data
  }, {
    loadingDelay: 300,
    manual: true,
  })

  useEffect(() => {
    if (!data) {
      return
    }
    const componentList = data.componentList ?? []

    if (componentList.length > 0) {
      setSelectId(componentList[0].id)
    }

    const { title, backgroundImage, pageHeaderImage } = data

    const components = componentList.map((item) => {
      return {
        ...item,
        props: JSON.parse(item.props as string || '{}') as ComponentPropsType,
      }
    })

    setQuestionInfo({
      title,
      backgroundImage: backgroundImage ?? undefined,
      pageHeaderImage: pageHeaderImage ?? undefined,
    })
    resetComponent(components)
  }, [data])

  useEffect(() => {
    run()
  }, [id])

  return { loading, error }
}
