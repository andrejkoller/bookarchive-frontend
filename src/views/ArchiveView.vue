<script setup lang="ts">
import type { Book } from '@/models/Book'
import { getBooks } from '@/services/bookService'
import { onMounted, ref } from 'vue'

const books = ref<Book[]>([])

onMounted(async () => {
  try {
    const data = await getBooks()
    books.value = data
    console.log('Books fetched successfully:', books.value)
  } catch (error) {
    console.error('Error fetching books:', error)
  }
})
</script>

<template>
  <section>
    <div class="archive">
      <div class="archive-header">
        <div class="filter-container"></div>
        <div class="input-container"></div>
      </div>
      <div class="archive-body">
        <div></div>
        <div class="book-list">
          <div v-for="book in books" :key="book.id" class="book-item">
            <h3>{{ book.title }}</h3>
            <p>Author: {{ book.author }}</p>
            <p>Genre: {{ book.genre }}</p>
            <p>Year: {{ book.yearPublished }}</p>
            <p>Notes: {{ book.note }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
