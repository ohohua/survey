import type { PropsWithChildren } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function checkAuth() {
  const token = localStorage.getItem('token')
  return !!token
}

export function RequireAuth({ children }: PropsWithChildren) {
  const [loading, setLoading] = useState(true)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const isAuthenticated = checkAuth()
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname }, replace: true })
    }
    else {
      setLoading(false)
    }
  }, [location.pathname])

  if (loading) {
    return <div>Loading...</div>
  }

  return children
}
