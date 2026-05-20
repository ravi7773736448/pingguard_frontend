import { useEffect, useState } from 'react'
import AppRouter from '../AppRouter.jsx'
import { useDispatch } from 'react-redux'
import { setUser, setLoading } from '../features/auth/state/auth.slice.js'
import { authMe } from '../features/auth/services/auth.api.js'

const App = () => {
  const dispatch = useDispatch()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // 1. First, check for token in URL (from Google OAuth redirect)
    const urlParams = new URLSearchParams(window.location.search)
    const tokenFromUrl = urlParams.get('token')
    
    if (tokenFromUrl) {
      console.log('[Auth] Token found in URL, storing in localStorage')
      localStorage.setItem('authToken', tokenFromUrl)
      // Clean up URL immediately
      window.history.replaceState({}, document.title, window.location.pathname)
    }

    // 2. Check if there's already a token in localStorage
    const storedToken = localStorage.getItem('authToken')
    console.log('[Auth] Token in localStorage:', storedToken ? 'YES' : 'NO')

    // 3. Check session with backend
    const checkSession = async () => {
      try {
        dispatch(setLoading(true))
        const data = await authMe()
        dispatch(setUser(data.user))
        console.log('[Auth] User loaded:', data.user?.email)
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