import type { Book, BookGenre } from '@/models/Book'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:7179/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getBooks = async (): Promise<Book[]> => {
  try {
    const response = await api.get('/books')
    return response.data
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}

export const getBookById = async (id: string): Promise<Book> => {
  try {
    const response = await api.get(`/books/${id}`)
    return response.data
  } catch (error) {
    console.error(`Error fetching book with id ${id}:`, error)
    throw error
  }
}

export const filterBooks = async (genre: BookGenre): Promise<Book[]> => {
  try {
    const response = await api.get('/books/bygenre', {
      params: { genre },
    })
    return response.data
  } catch (error) {
    console.error(`Error filtering books by genre ${genre}:`, error)
    throw error
  }
}

export const sortBooks = async (ascending: boolean): Promise<Book[]> => {
  try {
    const response = await api.get('/books/sort', {
      params: { ascending },
    })
    return response.data
  } catch (error) {
    console.error(`Error sorting books:`, error)
    throw error
  }
}
