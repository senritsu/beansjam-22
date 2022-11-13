<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useGameStore } from '../stores/game'

const game = useGameStore()

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const opacity = computed(() => lerp(1, 0.1, game.fatigue / 100))
</script>

<template>
  <div class="place">
    <div
      class="image"
      :style="{
        backgroundImage: `url(${game.currentLocation.image})`,
        opacity,
      }"
    >
      {{ opacity }}
    </div>
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
