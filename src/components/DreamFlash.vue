<script setup lang="ts">
defineProps<{
  image: string
}>()
</script>

<template>
  <div class="dream">
    <div class="image" :style="{ backgroundImage: `url(${image})` }"></div>
  </div>
</template>

<style scoped>
.dream {
  display: grid;
  place-items: center;
}

.image {
  animation: flicker 3s infinite;
  background-size: contain;
  width: 512px;
  height: 512px;
  color: black;
  box-shadow: 0 0 2em 2em #181818 inset;
}

@keyframes flicker {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 0.2;
  }
  25% {
    opacity: 0.1;
  }
  45% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
  }
}
</style>
