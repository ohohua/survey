import { Outlet } from 'react-router-dom'

function QuestionLayout() {
  return (
    <>
      <p> header </p>
      <div>
        <Outlet></Outlet>
      </div>
      <div>footer</div>
    </>
  )
}

export default QuestionLayout
