import type { ComponentInfo } from '@/store'
import type { MouseEvent } from 'react'
import clsx from 'clsx'
import s from '../Edit/EditCanvas.module.scss'
import { getComponent } from '../Edit/GetComponent'

interface StatQuestionProps {
  list: ComponentInfo[]
  selectId: string | undefined
  changeId: (id: string) => void
  loading: boolean
}
function StatQuestion(props: StatQuestionProps) {
  const { list, loading, selectId, changeId } = props

  function handleClick(e: MouseEvent<HTMLDivElement>, id: string) {
    changeId(id)
    e.stopPropagation()
  }

  if (loading) {
    return <>loading</>
  }

  return (
    <div className={s['stat-left']}>
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

export default memo(StatQuestion)
