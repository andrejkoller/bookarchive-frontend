<script lang="ts">
export default {
  name: 'AppHeader',
}
</script>

<template>
  <div class="header">
    <h1>
      <a href="/">
        <span class="text">Book Archive</span>
      </a>
    </h1>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 16px 32px;
}

.header h1 {
  margin: 0;
  font-size: 32px;
  text-transform: uppercase;
  font-weight: 400;
}

.header h1 a {
  text-decoration: none;
  color: #266152;
}
</style>
