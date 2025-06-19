<script setup lang="ts">
import type { Book } from '@/models/Book'
import { getBookById } from '@/services/bookService'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { VBtn } from 'vuetify/components'

const book = ref<Book>()

onMounted(async () => {
  const route = useRoute()
  const bookId = route.params.id as string

  try {
    book.value = await getBookById(bookId)
  } catch (error) {
    console.error('Error fetching book:', error)
  }
})
</script>

<template>
  <section>
    <div class="book-view">
      <div class="book-image">
        <img :src="book?.coverImageUrl" alt="Book Cover" />
      </div>
      <div class="book-wrapper">
        <div class="book-header">
          <h1>{{ book?.title }}</h1>
          <h2>{{ book?.author }}</h2>
        </div>
        <div class="book-details">
          <p>{{ book?.genre }}</p>
          <p>{{ book?.yearPublished }}</p>
          <p>{{ book?.summary }}</p>
          <p>{{ book?.pageCount }} pages</p>
          <p>{{ book?.format }}</p>
          <p>{{ book?.language }}</p>
          <p>{{ book?.note }}</p>
        </div>
        <div class="book-actions">
          <v-btn variant="outlined" :to="{ path: '/archive' }">Back to Archive</v-btn>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.book-view {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1024px;
  margin: 210px auto 0 auto;
}

.book-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
}

.book-image img {
  width: 100%;
  height: auto;
}

.book-wrapper {
  display: flex;
  flex-direction: column;
}

.book-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 16px;
}

.book-header h1 {
  font-size: 64px;
  margin: 0;
  font-family: 'LoraRegular', serif;
  font-weight: 400;
}

.book-header h2 {
  font-size: 32px;
  margin: 0;
  font-family: 'LoraRegular', serif;
  font-weight: 400;
}

.book-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.book-details p {
  margin: 0;
  font-size: 20px;
}

.book-actions {
  display: flex;
  justify-content: flex-start;
}

.book-actions a {
  font-size: 18px;
  font-weight: 400;
  color: #266152;
  background-color: transparent;
  border-radius: 0;
  padding: 8px 16px;
}
</style>
