import { Outlet } from 'react-router-dom'
import s from './QuestionLayout.module.scss'

function QuestionLayout() {
  return (
    <>
      <p className={s.header}> header </p>
      <div>
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default QuestionLayout
