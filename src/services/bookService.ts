import type { Book, BookFormat, BookGenre, BookLanguage } from '@/models/Book'
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

export const filterBooksByGenre = async (genre: BookGenre): Promise<Book[]> => {
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

export const filterBooksByFormat = async (format: BookFormat): Promise<Book[]> => {
  try {
    const response = await api.get('/books/byformat', {
      params: { format },
    })
    return response.data
  } catch (error) {
    console.error(`Error filtering books by format ${format}:`, error)
    throw error
  }
}

export const filterBooksByLanguage = async (language: BookLanguage): Promise<Book[]> => {
  try {
    const response = await api.get('/books/bylanguage', {
      params: { language },
    })
    return response.data
  } catch (error) {
    console.error(`Error filtering books by language ${language}:`, error)
    throw error
  }
}

export const sortBooksByCreationDate = async (ascending: boolean): Promise<Book[]> => {
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

export const searchBooks = async (query: string): Promise<Book[]> => {
  try {
    const response = await api.get('/books/search', {
      params: { query },
    })
    return response.data
  } catch (error) {
    console.error(`Error searching books with query "${query}":`, error)
    throw error
  }
}
