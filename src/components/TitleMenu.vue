<script setup lang="ts">
import { useGameStore } from '../stores/game'

const game = useGameStore()
</script>

<template>
  <main class="title" v-if="game.screen === 'title'">
    <div class="logo">
      <h1>Polar Eclipse</h1>
      <h3>prototype</h3>
      <button @click="game.startGame">Start Game</button>
    </div>
  </main>
</template>

<style scoped>
.title {
  display: grid;
  place-items: center;
}

.title h1 {
  font-size: 8em;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

button {
  margin-top: 1em;
  font-size: 3em;
  background-color: #333;
  transition: background-color 0.3s;
  border: none;
  border-radius: 0.1em;
  padding: 0.2em;
  color: white;
}

button:hover {
  background-color: #666;
  cursor: pointer;
}
</style>
