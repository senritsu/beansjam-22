<script setup lang="ts">
import RestingPlace from './RestingPlace.vue'
import WorldMap from './WorldMap.vue'
import StatusInterface from './StatusInterface.vue'
import { useMagicKeys } from '@vueuse/core'
import { watch } from 'vue'
import { useGameStore } from '../stores/game'

const game = useGameStore()

const { escape } = useMagicKeys()

watch(escape, (pressed) => {
  if (pressed) {
    game.returnToTitle()
  }
})
</script>

<template>
  <div class="scene">
    <RestingPlace class="bonfire" />
    <StatusInterface class="ui" :location="game.currentLocation" />
    <WorldMap class="map"></WorldMap>
  </div>
</template>

<style scoped>
.scene {
  display: grid;
  grid-template: 'main' 1fr / 1fr;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.bonfire,
.ui {
  grid-area: main;
}

.map {
  grid-area: main;
  align-self: center;
  justify-self: end;
  transition: transform 0.5s;
  transform: rotate(10deg) translate(80%, 10%);
}

.map:hover {
  transform: rotate(-5deg) translate(0%);
}
</style>
