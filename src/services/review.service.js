import axios from 'axios'

const reviewInstance = axios.create({
    baseURL: "/api/reviews",
    withCredentials: true
})

export const submitReview = async (reviewData) => {
  const response = await reviewInstance.post('/', reviewData)
  return response.data
}

export const getPublicReviews = async () => {
  const response = await reviewInstance.get('/')
  return response.data
}
