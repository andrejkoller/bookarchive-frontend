<script setup lang="ts">
import type { Book } from '@/models/Book'
import { BookFormat, BookGenre, BookLanguage } from '@/models/Book'
import {
  getBooks,
  filterBooksByGenre,
  sortBooksByCreationDate,
  filterBooksByFormat,
  filterBooksByLanguage,
} from '@/services/bookService'
import { onMounted, ref } from 'vue'
import { VBtn } from 'vuetify/components'
import { ArrowUp, ArrowDown, ArrowRight } from 'lucide-vue-next'

const books = ref<Book[]>([])
const isAscending = ref(true)

onMounted(async () => {
  try {
    const data = await getBooks()
    books.value = data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
})

const handleFilterBooksByGenre = async (genre: BookGenre) => {
  console.log('Filtering books by genre:', genre)
  try {
    const filteredBooks = await filterBooksByGenre(genre)
    books.value = filteredBooks
  } catch (error) {
    console.error('Error filtering books:', error)
  }
}

const handleFilterBooksByFormat = async (format: BookFormat) => {
  console.log('Filtering books by format:', format)
  try {
    const filteredBooks = await filterBooksByFormat(format)
    books.value = filteredBooks
  } catch (error) {
    console.error('Error filtering books:', error)
  }
}

const handleFilterBooksByLanguage = async (language: BookLanguage) => {
  console.log('Filtering books by language:', language)
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

const formatString = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1 $2')
}
</script>

<template>
  <section>
    <div class="archive">
      <div class="archive-header">
        <div class="filter-container">
          <v-btn class="no-hover" @click="toggleSortDirection()" variant="outlined">
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
      </div>
      <div class="archive-body">
        <div class="filters">
          <div class="genre">
            <h3>Genre</h3>
            <div class="genre-buttons">
              <v-btn
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
            <div class="book-link">
              <v-btn variant="outlined" :to="{ path: '/archive/books/' + book.id }">
                <span>Info</span>
                <ArrowRight />
              </v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
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

.filter-container {
  display: flex;
  gap: 32px;
}

.filter-container button {
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

.book-item:nth-child(2) {
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

.book-link {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.book-link a {
  font-size: 18px;
  font-weight: 400;
  border-radius: 0;
  background-color: transparent;
}
</style>
