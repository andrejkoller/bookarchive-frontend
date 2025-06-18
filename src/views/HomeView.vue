<script setup lang="ts">
import { VBtn } from 'vuetify/components'
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
          <img src="" alt="Book Cover" />
          <img src="" alt="Book Cover" />
          <img src="" alt="Book Cover" />
          <img src="" alt="Book Cover" />
          <img src="" alt="Book Cover" />
          <img src="" alt="Book Cover" />
          <img src="" alt="Book Cover" />
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
          <v-btn variant="outlined" href="/archive"> Go to Archive </v-btn>
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

.home-title {
  font-size: 2rem;
  font-family: 'LoraRegular', serif;
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
}

.about {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
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
  justify-content: space-between;
  width: 100%;
}

.about-body {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  gap: 6rem;
  padding: 0 44px;
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

.about-button a:hover {
  background-color: #ffecbd !important;
  color: #266152 !important;
}
</style>
