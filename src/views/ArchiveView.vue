<script setup lang="ts">
import type { Book } from '@/models/Book'
import { BookFormat, BookGenre, BookLanguage } from '@/models/Book'
import {
  getBooks,
  filterBooksByGenre,
  sortBooksByCreationDate,
  filterBooksByFormat,
  filterBooksByLanguage,
  searchBooks,
  deleteBookById,
  createBook,
} from '@/services/bookService'
import { onMounted, ref } from 'vue'
import { VBtn, VTextField, VDialog, VCard, VSelect, VFileInput } from 'vuetify/components'
import { ArrowUp, ArrowDown, ArrowRight, Plus, Minus } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()

const books = ref<Book[]>([])
const book = ref<Book>({
  id: 0,
  title: '',
  author: '',
  genre: BookGenre.Fiction,
  yearPublished: 0,
  pageCount: 0,
  format: BookFormat.Hardcover,
  language: BookLanguage.English,
  summary: '',
  note: '',
  publisher: '',
  previewImage: '',
  file: undefined as File | undefined,
  fileName: '',
  filePath: '',
})
const isAscending = ref(true)
const dialog = ref(false)

onMounted(async () => {
  try {
    const data = await getBooks()
    books.value = data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
})

const handleAddBook = async (bookData: Book) => {
  try {
    const formData = new FormData()
    formData.append('title', bookData.title)
    formData.append('author', bookData.author)
    formData.append('genre', bookData.genre)
    formData.append('yearPublished', bookData.yearPublished.toString())
    formData.append('pageCount', (bookData.pageCount || 0).toString())
    formData.append('format', bookData.format ?? BookFormat.Hardcover)
    formData.append('language', bookData.language ?? BookLanguage.English)
    formData.append('summary', bookData.summary ?? '')
    formData.append('note', bookData.note ?? '')
    formData.append('publisher', bookData.publisher ?? '')

    if (bookData.file) {
      formData.append('file', bookData.file)
      bookData.fileName = bookData.file.name
      bookData.filePath = `/uploads/${bookData.file.name}`
    }

    const newBook = await createBook(formData)
    books.value.push(newBook)
    dialog.value = false
  } catch (error) {
    console.error('Error adding book:', error)
  }
}

const handleDeleteBook = async (bookId: number) => {
  try {
    await deleteBookById(bookId)
    books.value = books.value.filter((book) => book.id !== bookId)
  } catch (error) {
    console.error('Error deleting book:', error)
  }
}

const handleFilterBooksByGenre = async (genre: BookGenre) => {
  try {
    const filteredBooks = await filterBooksByGenre(genre)
    books.value = filteredBooks
  } catch (error) {
    console.error('Error filtering books:', error)
  }
}

const handleFilterBooksByFormat = async (format: BookFormat) => {
  try {
    const filteredBooks = await filterBooksByFormat(format)
    books.value = filteredBooks
  } catch (error) {
    console.error('Error filtering books:', error)
  }
}

const handleFilterBooksByLanguage = async (language: BookLanguage) => {
  try {
    const filteredBooks = await filterBooksByLanguage(language)
    books.value = filteredBooks
  } catch (error) {
    console.error('Error filtering books:', error)
  }
}

const handleSortBooksByCreationDate = async (ascending: boolean) => {
  try {
    const sortedBooks = await sortBooksByCreationDate(ascending)
    books.value = sortedBooks
  } catch (error) {
    console.error('Error sorting books:', error)
  }
}

const toggleSortDirection = () => {
  isAscending.value = !isAscending.value
  handleSortBooksByCreationDate(isAscending.value)
}

const handleSearchBooks = async (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  const query = target.value.trim()
  try {
    const searchResults = await searchBooks(query)
    books.value = searchResults
  } catch (error) {
    console.error('Error searching books:', error)
  }
}

const formatString = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2')
}
</script>

<template>
  <section>
    <div class="archive">
      <div class="archive-header">
        <div class="wrapper">
          <div class="filter-container">
            <v-btn class="button" @click="toggleSortDirection()" variant="plain">
              <div class="sort-wrapper" v-if="isAscending">
                <div><span>Ascending</span> <span>Creation date</span></div>
                <ArrowUp />
              </div>
              <div class="sort-wrapper" v-else>
                <div><span>Descending</span> <span>Creation date</span></div>
                <ArrowDown />
              </div>
            </v-btn>
          </div>
          <div class="add-container">
            <v-btn variant="plain" class="button">
              <div class="add-wrapper" @click="dialog = true">
                <div><span>Add Book</span> <span>New Entry</span></div>
                <Plus />
              </div>
            </v-btn>
          </div>
        </div>
        <div class="search-container">
          <v-text-field
            label="Search"
            placeholder="Search by title or author"
            variant="solo-filled"
            @keyup.enter="handleSearchBooks"
            class="search-input"
          />
        </div>
      </div>
      <div class="archive-body">
        <div class="filters">
          <div class="genre">
            <h3>Genre</h3>
            <div class="genre-buttons">
              <v-btn
                variant="plain"
                class="button"
                v-for="genre in Object.values(BookGenre)"
                :key="genre"
                @click="handleFilterBooksByGenre(genre)"
              >
                {{ formatString(genre) }}
              </v-btn>
            </div>
          </div>
          <div class="format">
            <h3>Format</h3>
            <div class="format-buttons">
              <v-btn
                variant="plain"
                class="button"
                v-for="format in Object.values(BookFormat)"
                :key="format"
                @click="handleFilterBooksByFormat(format)"
              >
                {{ formatString(format) }}
              </v-btn>
            </div>
          </div>
          <div class="language">
            <h3>Language</h3>
            <div class="language-buttons">
              <v-btn
                variant="plain"
                class="button"
                v-for="language in Object.values(BookLanguage)"
                :key="language"
                @click="handleFilterBooksByLanguage(language)"
              >
                {{ formatString(language) }}
              </v-btn>
            </div>
          </div>
        </div>
        <div class="book-list">
          <div v-for="book in books" :key="book.id" class="book-item">
            <div class="book-wrapper">
              <div class="book-genre">
                <p>{{ formatString(book.genre) }}</p>
              </div>
              <div class="book-details">
                <h3>{{ book.title }}</h3>
                <p>{{ book.author }}</p>
              </div>
            </div>
            <div class="book-buttons">
              <v-btn variant="plain" class="button" @click="handleDeleteBook(book.id)">
                <span>Remove</span>
                <Minus />
              </v-btn>
              <v-btn
                variant="plain"
                class="button"
                @click="router.push(`/archive/books/${book.id}`)"
              >
                <span>Info</span>
                <ArrowRight />
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <v-dialog v-model="dialog" width="600px" height="100%" persistent>
    <v-card class="dialog-content">
      <form @submit.prevent="dialog = false" class="add-book-form">
        <v-text-field label="Title" variant="underlined" v-model="book.title" required />
        <v-text-field label="Author" variant="underlined" v-model="book.author" required />
        <v-select
          label="Genre"
          variant="underlined"
          :items="Object.values(BookGenre)"
          v-model="book.genre"
          required
        />
        <v-text-field
          label="Year Published"
          variant="underlined"
          type="number"
          v-model="book.yearPublished"
          required
        />
        <v-text-field
          label="Page Count"
          variant="underlined"
          type="number"
          v-model="book.pageCount"
          required
        />
        <v-select
          label="Format"
          variant="underlined"
          :items="Object.values(BookFormat)"
          v-model="book.format"
          required
        />
        <v-select
          label="Select language"
          variant="underlined"
          :items="Object.values(BookLanguage)"
          v-model="book.language"
          required
        />
        <v-text-field
          label="Summary"
          variant="underlined"
          v-model="book.summary"
          placeholder="A brief summary of the book"
        />
        <v-text-field
          label="Note"
          variant="underlined"
          v-model="book.note"
          placeholder="Any personal notes or thoughts"
        />
        <v-text-field
          label="Publisher"
          variant="underlined"
          v-model="book.publisher"
          placeholder="Publisher of the book"
        />
        <v-file-input
          label="Upload Preview Image"
          variant="underlined"
          v-model="book.file"
          accept=".pdf,.epub,.jpg,.jpeg,.png"
          :show-size="true"
          density="comfortable"
        />
        <div class="button-container">
          <v-btn type="submit" class="button" variant="plain" @click="handleAddBook(book)"
            >Add Book</v-btn
          >
          <v-btn class="button" variant="plain" @click="dialog = false">Close</v-btn>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.no-hover:hover,
.no-hover:focus,
.no-hover:active {
  background-color: inherit !important;
  color: inherit !important;
  box-shadow: none !important;
}

.archive {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 32px;
}

.archive-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 32px;
  width: 100%;
  padding: 32px 0;
  border-bottom: 1px solid #266152;
}

.wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 32px;
  width: 100%;
}

.filter-container {
  display: flex;
}

.filter-container .button {
  border-radius: 0;
  padding: 8px 16px;
  font-size: 24px;
  font-weight: 400;
  background-color: #266152;
  color: #ffecbd;
  height: auto;
  cursor: pointer;
  text-decoration: underline;
}

.add-container .button {
  border-radius: 0;
  padding: 8px 16px;
  font-size: 24px;
  font-weight: 400;
  background-color: #266152;
  color: #ffecbd;
  height: auto;
  cursor: pointer;
  text-decoration: underline;
}

.add-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.add-wrapper div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.add-wrapper span:nth-child(2) {
  font-size: 16px;
  font-weight: 400;
  text-transform: none;
  font-family: 'LoraRegular', serif;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
}

.sort-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
}

.sort-wrapper div {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.sort-wrapper span:nth-child(2) {
  font-size: 16px;
  font-weight: 400;
  text-transform: none;
  font-family: 'LoraRegular', serif;
}

.archive-body {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.filters {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 25%;
  margin-top: 32px;
  position: sticky;
  top: 0;
}

.genre {
  display: flex;
  flex-direction: c;
  flex-wrap: wrap;
  align-items: flex-start;
}

.genre-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.genre button {
  text-decoration: none;
  background-color: transparent;
  box-shadow: none;
  color: #266152;
  font-size: 18px;
  font-weight: 400;
  padding: 0;
  border-radius: 0;
  cursor: pointer;
}

.genre button:hover {
  background-color: #266152;
  color: #ffecbd;
}

.format {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
}

.format-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.format button {
  text-decoration: none;
  background-color: transparent;
  box-shadow: none;
  color: #266152;
  font-size: 18px;
  font-weight: 400;
  padding: 0;
  border-radius: 0;
  cursor: pointer;
}

.format button:hover {
  background-color: #266152;
  color: #ffecbd;
}

.language {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: flex-start;
}

.language-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
}

.language button {
  text-decoration: none;
  background-color: transparent;
  box-shadow: none;
  color: #266152;
  font-size: 18px;
  font-weight: 400;
  padding: 0;
  border-radius: 0;
  cursor: pointer;
}

.language button:hover {
  background-color: #266152;
  color: #ffecbd;
}

.book-list {
  display: flex;
  flex-direction: column;
  width: 75%;
  margin-left: auto;
}

.book-item {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 64px 16px 32px 0px;
}

.book-item:nth-child(even) {
  color: #ffecbd;
  background-color: #266152;
}

.book-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.book-genre p {
  margin: 0;
  transform: rotate(-90deg);
  font-size: 18px;
  font-weight: 400;
}

.book-details {
  flex-grow: 1;
}

.book-details h3 {
  margin: 0;
  font-size: 64px;
  font-weight: 400;
  font-family: 'LoraRegular', serif;
}

.book-details p {
  margin: 0;
  font-size: 32px;
  font-weight: 400;
  font-family: 'LoraRegular', serif;
}

.book-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  width: 100%;
}

.book-buttons .button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 400;
  border-radius: 0;
  background-color: transparent;
  color: inherit;
  padding: 8px 16px;
  border: 1px solid #266152;
  cursor: pointer;
}

.book-buttons .button:hover {
  background-color: #266152;
  color: #ffecbd;
}

.book-item:nth-child(even) .book-buttons .button {
  color: #ffecbd;
  border-color: #ffecbd;
}

.book-item:nth-child(even) .book-buttons .button:hover {
  background-color: #ffecbd;
  color: #266152;
}

.dialog-content {
  background-color: #266152;
  color: #ffecbd;
  border-radius: 0 !important;
}

.add-book-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.button-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

.button-container .button {
  width: 100%;
  border-radius: 0;
  border: 1px solid #266152;
  background-color: #ffecbd;
  color: #266152;
  font-size: 18px;
  font-weight: 400;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
