import axios from 'axios'

const getApiBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  
  if (!apiUrl) {
    console.warn('⚠️  VITE_API_URL not configured, falling back to localhost:3000')
    return 'http://localhost:3000'
  }
  
  return apiUrl
}

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem('authToken')
    
    // Also try to get from cookie as fallback
    if (!token) {
      const cookies = document.cookie.split(';')
      const tokenCookie = cookies.find(c => c.trim().startsWith('token='))
      if (tokenCookie) {
        token = tokenCookie.split('=')[1]
      }
    }
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url} - Token: YES`)
    } else {
      console.log(`📤 ${config.method?.toUpperCase()} ${config.url} - Token: NO`)
    }
    
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error.message)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} ${response.config?.url}`)
    return response
  },
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error'
    const errorStatus = error.response?.status

    console.error(`❌ API Error: ${errorStatus} - ${errorMessage}`)

    if (errorStatus === 401) {
      // Token expired or invalid - clear localStorage and redirect to login
      localStorage.removeItem('authToken')
      console.warn('🔐 Auth failed - clearing token and redirecting to login')
    }

    return Promise.reject({
      message: errorMessage,
      status: errorStatus,
      data: error.response?.data,
      originalError: error,
    })
  }
)

export default api