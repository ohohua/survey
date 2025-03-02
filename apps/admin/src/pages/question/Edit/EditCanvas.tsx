import QuestionInput from '@/components/Question/QuestionInput/QuestionInput'
import QuestionTitle from '@/components/Question/QuestionTitle/QuestionTitle'
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
