<script setup lang="ts">
import type { Book } from '@/models/Book'
import { getBooks } from '@/services/bookService'
import { onMounted, ref } from 'vue'
import { VBtn } from 'vuetify/components'

const books = ref<Book[]>([])

onMounted(async () => {
  try {
    const data = await getBooks()
    books.value = data
  } catch (error) {
    console.error('Error fetching books:', error)
  }
})
</script>

<template>
  <section>
    <div class="archive">
      <div class="archive-header">
        <div class="filter-container">
          <v-btn variant="outlined">Filter 1</v-btn>
          <v-btn variant="outlined">Filter 2</v-btn>
          <v-btn variant="outlined">Filter 3</v-btn>
        </div>
      </div>
      <div class="archive-body">
        <div></div>
        <div class="book-list">
          <div v-for="book in books" :key="book.id" class="book-item">
            <div class="book-wrapper">
              <div class="book-genre">
                <p>{{ book.genre }}</p>
              </div>
              <div class="book-details">
                <h3>{{ book.title }}</h3>
                <p>{{ book.author }}</p>
              </div>
            </div>
            <div class="book-link">
              <v-btn variant="outlined" :to="{ path: '/archive/book/' + book.id }">Info</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
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
  color: #266152;
  background-color: transparent;
  height: auto;
}

.archive-body {
  display: flex;
  flex-direction: row;
  width: 100%;
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
</style>
