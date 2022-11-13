<script setup lang="ts">
import type { Location } from '@/locations'
import { useGameStore } from '@/stores/game'
import LocationName from './LocationName.vue'
import ProgressBar from './ProgressBar.vue'

defineProps<{ location: Location }>()

const game = useGameStore()
</script>

<template>
  <div class="ui">
    <LocationName class="name" :name="location.name" />
    <div class="stats">
      <ProgressBar :value="game.energy / 100" color="red" />
      <ProgressBar :value="game.sanity / 100" color="blue" />
    </div>
  </div>
</template>

<style scoped>
.ui {
  display: grid;
  grid-template:
    'stats location unused' auto
    'mid mid unused' 1fr
    'actions actions unused' auto / 1fr 4fr 1fr;
  gap: 0.5em;
  padding: 1em;
}

.name {
  align-self: start;
  justify-self: center;
  grid-area: location;
}

.stats {
  grid-area: stats;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.spacer {
  flex: 1;
  pointer-events: none;
}
</style>
