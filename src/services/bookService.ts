import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:7179/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getBooks = async () => {
  try {
    const response = await api.get('/books')
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}
