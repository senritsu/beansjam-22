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
  padding: 1em;
  border: 1px solid white;
}

.name {
  color: white;
}
</style>
