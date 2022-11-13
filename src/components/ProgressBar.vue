<script setup lang="ts">
defineProps<{
  color: string
  value: number
}>()
</script>

<template>
  <div class="container">
    <div
      class="fill"
      :style="{ backgroundColor: color, width: `${value * 100}%` }"
    ></div>
  </div>
</template>

<style scoped>
.container {
  background-color: #333;
  height: 1.5em;
}

.fill {
  height: 100%;
}
</style>
