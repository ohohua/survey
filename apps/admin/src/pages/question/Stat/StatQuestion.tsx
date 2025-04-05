import type { ComponentPropsType } from '@/components/Question'
import type { ComponentInfo } from '@/store'
import type { MouseEvent } from 'react'
import { loadQuestionInfo } from '@/api'
import { useRequest } from 'ahooks'
import clsx from 'clsx'
import { useParams } from 'react-router-dom'
import s from '../Edit/EditCanvas.module.scss'
import { getComponent } from '../Edit/GetComponent'

function StatQuestion() {
  const { id = '' } = useParams()
  const [list, setList] = useState<ComponentInfo[]>([])
  const [selectId, setSelectId] = useState<string | undefined>(undefined)

  const { data, error, loading } = useRequest(() => loadQuestionInfo(id))

  useEffect(() => {
    const components = data?.data?.componentList?.map((item) => {
      return {
        ...item,
        props: JSON.parse(item.props as string || '{}') as ComponentPropsType,
      }
    })
    setList(components || [])
  }, [data])

  function handleClick(e: MouseEvent<HTMLDivElement>, id: string) {
    setSelectId(id)
    e.stopPropagation()
  }

  if (loading || error) {
    return <>loading</>
  }

  return (
    <div>
      {
        list.map((c) => {
          const { id } = c
          const classNameWrapper = clsx({
            [s.component]: true,
            [s['select-component']]: selectId === id,
          })

          return (
            <div key={id} className={classNameWrapper} onClick={e => handleClick(e, id)}>
              {getComponent(c)}
            </div>
          )
        })
      }

    </div>
  )
}

export default StatQuestion
