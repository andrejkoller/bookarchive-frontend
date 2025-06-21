<script setup lang="ts">
import { BookFormat, BookGenre, BookLanguage, type Book } from '@/models/Book'
import { getBookById, updateBookById } from '@/services/bookService'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { VBtn, VDialog, VCard, VSelect, VTextField, VFileInput } from 'vuetify/components'

const book = ref<Book>({
  id: 0,
  title: '',
  author: '',
  genre: BookGenre.Fiction,
  yearPublished: new Date().getFullYear(),
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
const dialog = ref(false)

onMounted(async () => {
  const route = useRoute()
  const bookId = route.params.id as string

  try {
    book.value = await getBookById(bookId)
  } catch (error) {
    console.error('Error fetching book:', error)
  }
})

const handleUpdateBook = async (bookData: Book) => {
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

    if (book.value?.id !== undefined) {
      const newBook = await updateBookById(book.value.id, formData)
      book.value = newBook
      dialog.value = false
    } else {
      console.error('Book ID is undefined. Cannot update book.')
    }
  } catch (error) {
    console.error('Error adding book:', error)
  }
}
</script>

<template>
  <section>
    <div class="book-view">
      <div class="book-image">
        <img
          :src="book?.previewImage ? `https://localhost:7179/${book.previewImage}` : ''"
          alt="Book Cover"
        />
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
          <p>{{ book?.publisher }}</p>
        </div>
        <div class="book-actions">
          <v-btn class="button" variant="plain" @click="$router.push('/archive')">
            <span>Back</span>
          </v-btn>
          <v-btn class="button" variant="plain" @click="dialog = true">
            <span>Edit</span>
          </v-btn>
        </div>
      </div>
    </div>
  </section>

  <v-dialog v-model="dialog" width="600px" height="100%" persistent>
    <v-card class="dialog-content">
      <form v-if="book" @submit.prevent="dialog = false" class="edit-book-form">
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
          label="Preview Image"
          variant="underlined"
          v-model="book.file"
          accept=".pdf,.epub,.jpg,.jpeg,.png"
          :show-size="true"
          prepend-icon="mdi-upload"
          density="comfortable"
        />
        <div class="button-container">
          <v-btn
            type="submit"
            class="button"
            variant="plain"
            :disabled="!book"
            @click="book && handleUpdateBook(book)"
            >Update Book</v-btn
          >
          <v-btn class="button" variant="plain" @click="dialog = false">Close</v-btn>
        </div>
      </form>
      <div class="loading-info" v-else>Loading book data...</div>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.book-view {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 64px;
  max-width: 1440px;
  margin: 120px auto 0 auto;
}

.book-image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
}

.book-image img {
  width: 500px;
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
  align-items: center;
  gap: 16px;
}

.book-actions .button {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 400;
  color: #266152;
  background-color: transparent;
  border-radius: 0;
  border: 1px solid #266152;
  padding: 8px 16px;
  cursor: pointer;
}

.book-actions .button:hover {
  background-color: #266152;
  color: #ffecbd;
}

.dialog-content {
  background-color: #266152;
  color: #ffecbd;
  border-radius: 0 !important;
}

.edit-book-form {
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
  font-size: 18px;
  font-weight: 400;
  color: #266152;
  background-color: #ffecbd;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

.loading-info {
  color: #ffecbd;
  font-size: 24px;
  text-align: center;
  padding: 16px;
}
</style>
