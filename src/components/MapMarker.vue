<script setup lang="ts">
defineProps<{
  name: string
  pos: { x: number; y: number }
  isCurrent?: boolean
  isExplored?: boolean
  isValidDestination?: boolean
}>()
</script>

<template>
  <circle
    class="marker"
    :class="{ isCurrent, isExplored, isValidDestination }"
    :cx="pos.x"
    :cy="pos.y"
    :r="isExplored || isCurrent || isValidDestination ? 2 : 1"
  />
  <!-- <text :x="pos.x + 3" :y="pos.y + 1">{{ name }}</text> -->
</template>

<style scoped>
.marker {
  fill: rgb(105, 30, 29);
  opacity: 0.6;
  stroke: black;
  stroke-width: 0.3;
  transition: r 0.2s, stroke 0.2s;
}

.marker.isExplored {
  opacity: 1;
  fill: rgb(77, 77, 77);
}

.marker.isCurrent {
  opacity: 1;
  fill: orange;
}

.marker.isValidDestination {
  opacity: 1;
  cursor: pointer;
  fill: rgb(170, 192, 157);
}

.marker.isValidDestination:hover {
  cursor: pointer;
  stroke: rgb(171, 194, 196);
}

text {
  font: bold 2px sans-serif;
}
</style>
