<script setup lang="ts">
import type { Location } from '@/locations'
defineProps<{
  location: Location
}>()
</script>

<template>
  <div class="place">
    <div
      class="image"
      :style="{ backgroundImage: `url(${location.image})` }"
    ></div>
  </div>
</template>

<style scoped>
.place {
  display: grid;
  place-items: center;
}

.image {
  background-size: contain;
  width: 512px;
  height: 512px;
  color: black;
  box-shadow: 0 0 2em 2em #181818 inset;
}
</style>
