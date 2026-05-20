import { useEffect, useState } from 'react'
import AppRouter from '../AppRouter.jsx'
import { useDispatch } from 'react-redux'
import { setUser, setLoading } from '../features/auth/state/auth.slice.js'
import { authMe } from '../features/auth/services/auth.api.js'

const App = () => {
  const dispatch = useDispatch()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      try {
        dispatch(setLoading(true))
        const data = await authMe()
        dispatch(setUser(data.user))
      } catch (err) {
        console.error('[Auth] Session check failed:', err?.message || err)
        dispatch(setUser(null))
      } finally {
        dispatch(setLoading(false))
        setReady(true)
      }
    }

    checkSession()
  }, [dispatch])

  if (!ready) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0a0a0a' }}>
        <div style={{ width: '30px', height: '30px', border: '3px solid #333', borderTopColor: '#f5f5f5', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App