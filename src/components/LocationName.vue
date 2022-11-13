<script setup lang="ts">
defineProps<{
  name: string
}>()
</script>

<template>
  <div class="container">
    <div class="box">
      <div class="name">{{ name }}</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}

.box {
  border: 1px solid rgb(170, 170, 170);
  padding: 1em;
  border-radius: 0.2em;
  background-color: rgba(0, 0, 0, 0.75);
}
</style>
