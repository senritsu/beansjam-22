<script setup lang="ts">
import { useGameStore } from '../stores/game'

defineProps<{
  image: string
}>()

const game = useGameStore()
</script>

<template>
  <div class="message">
    <img :src="image" alt="" />
    <slot></slot>
    <button @click="game.returnToTitle">Quit</button>
  </div>
</template>

<style scoped>
.message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 3em;
}
button {
  border: none;
  background-color: #666;
  border-radius: 0.1em;
  padding: 0.2em;
  color: var(--color-text);
  font-size: 1em;
  cursor: pointer;
}
</style>
