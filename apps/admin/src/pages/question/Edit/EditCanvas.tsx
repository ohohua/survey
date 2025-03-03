import QuestionInput from '@/components/Question/QuestionInput/Component'
import QuestionTitle from '@/components/Question/QuestionTitle/Component'
import s from './EditCanvas.module.scss'

function EditCanvas() {
  return (
    <>
      <div className={s.component}>
        <QuestionTitle></QuestionTitle>
      </div>
      <div className={s.component}>
        <QuestionInput></QuestionInput>
      </div>
    </>
  )
}

export default EditCanvas
