import { useParams } from 'react-router-dom'

function Edit() {
  const { id = '' } = useParams()

  return (
    <>
      edit
      {id}
    </>
  )
}
export default Edit
