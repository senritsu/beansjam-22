<script setup lang="ts">
import { computed, toRefs } from 'vue'

type Coord = { x: number; y: number }

const props = defineProps<{ from: Coord; to: Coord }>()
const { from, to } = toRefs(props)

const average = (a: number, b: number) => (a + b) / 2
const randomize = (value: number, symmetricMagnitude: number) =>
  value + (Math.random() - 0.5) * 2 * symmetricMagnitude

const distance = (a: number, b: number) => Math.abs(a - b)
const controlPoint = computed(() => ({
  x: randomize(
    average(from.value.x, to.value.x),
    distance(from.value.x, to.value.x) / 2
  ),
  y: randomize(
    average(from.value.y, to.value.y),
    distance(from.value.y, to.value.y) / 2
  ),
}))

const d = computed(
  () =>
    `M ${from.value.x} ${from.value.y} Q ${controlPoint.value.x} ${controlPoint.value.y} ${to.value.x} ${to.value.y}`
)
</script>

<template>
  <path class="travel-path" :d="d"></path>
</template>

<style scoped>
.travel-path {
  stroke-dasharray: 1;
  stroke-width: 0.6;
  stroke: rgb(196, 56, 56);
  fill: transparent;
}
</style>
