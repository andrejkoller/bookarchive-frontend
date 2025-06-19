<script setup lang="ts">
import type { Book, BookGenre } from '@/models/Book'
import { filterBooks, getBooks, sortBooks } from '@/services/bookService'
import { onMounted, ref } from 'vue'
import { VBtn } from 'vuetify/components'
import { ArrowUp } from 'lucide-vue-next'
import { ArrowDown } from 'lucide-vue-next'

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

const filterBooksByGenre = async (genre: BookGenre) => {
  try {
    const filteredBooks = await filterBooks(genre)
    books.value = filteredBooks
  } catch (error) {
    console.error('Error filtering books:', error)
  }
}

const sortBooksByCreationDate = async (ascending: boolean) => {
  try {
    const sortedBooks = await sortBooks(ascending)
    books.value = sortedBooks
  } catch (error) {
    console.error('Error sorting books:', error)
  }
}

const toggleSortDirection = () => {
  isAscending.value = !isAscending.value
  sortBooksByCreationDate(isAscending.value)
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
        <div class="filter-list">
          <span
            v-for="book in books"
            :key="book.id"
            @click="filterBooksByGenre(book.genre)"
            class="filter-item"
          >
            {{ formatString(book.genre) }}
          </span>
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
              <v-btn variant="outlined" :to="{ path: '/archive/books/' + book.id }">Info</v-btn>
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

.filter-list {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 25%;
  margin-top: 32px;
}

.filter-list span {
  font-size: 24px;
  font-weight: 400;
  font-family: 'LoraRegular', serif;
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
