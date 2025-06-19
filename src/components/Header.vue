<script lang="ts">
export default {
  name: 'AppHeader',
}
</script>

<template>
  <div class="header">
    <h1>
      <span class="text">Library Management System</span>
    </h1>
    <p>
      <a href="/">
        <span class="text">Book Archive</span>
      </a>
    </p>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
}

.header h1 {
  margin: 0;
  font-size: 32px;
  font-family: 'LoraRegular', serif;
  font-weight: 400;
  font-style: italic;
  color: #266152;
}

.header p {
  margin: 0;
  font-size: 32px;
  text-transform: uppercase;
  font-weight: 400;
}

.header p a {
  text-decoration: none;
  color: #266152;
}
</style>
