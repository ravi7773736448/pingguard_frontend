import api from '../utils/api'

/**
 * All review API calls use the centralized api instance
 * which handles baseURL, credentials, and error handling automatically
 */

export const submitReview = async (reviewData) => {
  const response = await api.post('/api/reviews/', reviewData)
  return response.data
}

export const getPublicReviews = async () => {
  const response = await api.get('/api/reviews/')
  return response.data
}
