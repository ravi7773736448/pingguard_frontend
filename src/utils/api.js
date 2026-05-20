import axios from 'axios'

/**
 * Get the API base URL from environment variables
 * Defaults to localhost:3000 for development if not set
 */
const getApiBaseUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL
  
  if (!apiUrl) {
    console.warn(
      '⚠️  VITE_API_URL not configured in .env file. Falling back to http://localhost:3000'
    )
    return 'http://localhost:3000'
  }
  
  return apiUrl
}

/**
 * Create an axios instance with centralized configuration
 * - Base URL from environment variables
 * - withCredentials enabled for JWT/session authentication
 * - Proper error handling for failed requests
 */
const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Request interceptor for adding authentication headers if needed
 */
api.interceptors.request.use(
  (config) => {
    // Add token from localStorage if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log(`📤 API Request: ${config.method?.toUpperCase()} ${config.url}`, { hasToken: !!token })
    return config
  },
  (error) => {
    console.error('❌ Request Error:', error.message)
    return Promise.reject(error)
  }
)

/**
 * Response interceptor for centralized error handling
 */
api.interceptors.response.use(
  (response) => {
    console.log(`📥 API Response: ${response.status} ${response.config?.url}`, { data: response.data })
    return response
  },
  (error) => {
    // Handle different error types
    const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred'
    const errorStatus = error.response?.status

    // Log error for debugging
    console.error('❌ API Error:', {
      status: errorStatus,
      message: errorMessage,
      url: error.config?.url,
      method: error.config?.method,
    })

    // Handle specific error statuses
    if (errorStatus === 401) {
      // Unauthorized - redirect to login or refresh token
      console.warn('🔐 Authentication failed. Please log in again.')
      // You can dispatch a Redux action or navigate to login here
    } else if (errorStatus === 403) {
      console.warn('🚫 Access forbidden. You do not have permission to access this resource.')
    } else if (errorStatus === 404) {
      console.warn('⚠️  Resource not found.')
    } else if (errorStatus === 500) {
      console.error('💥 Server error. The backend service may be temporarily unavailable.')
    } else if (!error.response) {
      // Network error or backend is offline
      console.error('🌐 Network Error: Unable to connect to the backend. Check your internet connection or if the server is running.')
    }

    // Return enriched error object
    return Promise.reject({
      message: errorMessage,
      status: errorStatus,
      data: error.response?.data,
      originalError: error,
    })
  }
)

export default api
