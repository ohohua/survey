import { useLoadQuestionData } from '@/hooks/useLoadQuestionInfo'
import EditCanvas from './EditCanvas'
import s from './index.module.scss'

function Edit() {
  useLoadQuestionData()

  return (
    <div className={s.container}>
      <aside className={s.left}>l</aside>
      <div className={s.center}>
        <div className={s.canvas}>
          <EditCanvas></EditCanvas>
        </div>
      </div>
      <div className={s.right}>r</div>
    </div>
  )
}
export default Edit
