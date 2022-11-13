<script setup lang="ts">
import MapMarker from './MapMarker.vue'
import MapPath from './MapPath.vue'
import map from '@/assets/map2.jfif'
import { useGameStore } from '@/stores/game'
import type { Location } from '@/locations'
import locations from '@/locations'
import { computed } from 'vue'

const game = useGameStore()

const paths = computed(() =>
  locations
    .filter(
      (location) => game.visibleLocations.has(location.id) || showEverything
    )
    .reduce((array, from) => {
      for (const toId of from.connectedTo.filter(
        (id) => game.visibleLocations.has(id) || showEverything
      )) {
        const to = locations.find((x) => x.id === toId)

        if (to) {
          array.push([from, to])
        }
      }

      return array
    }, [] as [Location, Location][])
)

const showEverything = false
</script>

<template>
  <div>
    <div
      class="mapFrame"
      :class="{ canTravel: game.canTravel }"
      :style="{ backgroundImage: `url(${map})` }"
    >
      <svg viewBox="0 0 100 100">
        <MapPath
          v-for="[from, to] in paths"
          :key="`path-${from.id}-${to.id}`"
          :from="from.pos"
          :to="to.pos"
        />
        <MapMarker
          v-for="location in locations.filter(
            (location) =>
              game.visibleLocations.has(location.id) || showEverything
          )"
          :key="location.id"
          :pos="location.pos"
          :name="location.name"
          :isExplored="game.visitedLocations.has(location.id)"
          :isCurrent="location.id === game.currentLocation.id"
          :isValidDestination="
            game.currentLocation.connectedTo.includes(location.id) &&
            game.canTravel
          "
          @click="game.moveTo(location.id)"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.mapFrame {
  display: grid;
  grid-template: 1fr / 1fr;
  background-color: rgb(238, 235, 204);
  background-size: cover;
  color: #333;
  overflow: hidden;
  width: 40em;
  height: 40em;
  border: 0.5em solid rgb(141, 134, 111);
  border-radius: 2em;
}

.mapFrame.canTravel:not(:hover) {
  animation: jiggle 2s infinite;
}

@keyframes jiggle {
  0% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(10px);
  }
  2% {
    transform: translateX(-10px);
  }
  30% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(0);
  }
}

svg {
  width: 100%;
  height: 100%;
}
</style>
