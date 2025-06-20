<script setup lang="ts">
import { VBtn } from 'vuetify/components'
import { ArrowRight } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { getBooks } from '@/services/bookService'
import type { Book } from '@/models/Book'

const books = ref<Book[]>([])

onMounted(async () => {
  try {
    books.value = await getBooks()
  } catch (error) {
    console.error('Error fetching books:', error)
  }
})
</script>

<template>
  <main>
    <div class="home">
      <div class="home-header">
        <div class="home-title">
          <h1>Library Management System</h1>
        </div>
      </div>
      <div class="home-body">
        <div class="home-brand">
          <p>Book Archive</p>
        </div>
      </div>
    </div>
    <div class="about">
      <div class="about-header">
        <div class="about-images">
          <img
            v-for="book in books.slice(0, 6)"
            :key="book.id"
            :src="`https://localhost:7179/${book.previewImage}`"
            alt="Book Cover"
            class="about-image"
            :style="books.length >= 6 ? 'width: 100%;' : 'width: auto;'"
          />
        </div>
      </div>
      <div class="about-body">
        <div class="about-text">
          <p>
            Book archive is a personal digital library project designed to help book lovers catalog,
            manage, and reflect on their private book collections. Inspired by the charm of personal
            libraries and the discipline of archiving, this platform allows users to record detailed
            information about each book they own — including title, author, genre, year, and notes.
            With a clean and focused interface, Book archive aims to preserve the unique stories of
            each reader’s bookshelf, offering an easy way to browse, search, and revisit one’s
            literary journey. Whether organized by genre, author, or personal significance, Book
            archive turns a private collection into a meaningful and accessible archive.
          </p>
        </div>
        <div class="about-button">
          <v-btn variant="outlined" href="/archive">
            <span>Explore Archive</span>
            <ArrowRight class="icon" />
          </v-btn>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90vh;
  padding: 20px;
}

.home-header {
  text-align: left;
  margin-bottom: 20px;
  width: 100%;
}

.home-title h1 {
  font-size: 4rem;
  font-family: 'LoraRegular', serif;
  font-weight: 400;
  font-style: italic;
}

.home-body {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
}

.home-brand p {
  font-size: 6rem;
  margin: 0;
  text-transform: uppercase;
  font-weight: 400;
}

.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  width: 100%;
  background-color: #266152;
}

.about-header {
  margin: 120px 0 160px 0;
  width: 100%;
}

.about-images {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.about-image {
  height: 500px;
}

.about-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  gap: 6rem;
  padding: 0 44px;
  margin-bottom: 120px;
}

.about-body p {
  color: #ffecbd;
  font-size: 2rem;
  font-family: 'LoraRegular', serif;
  line-height: 1.6;
  margin: 0;
  text-align: left;
}

.about-button a {
  border-radius: 0;
  border-color: #ffecbd;
  color: #ffecbd;
  font-size: 1.5rem;
  padding: 8px 16px;
}

.icon {
  margin-left: 8px;
}
</style>
