<script setup lang="ts">
import TitleMenu from './components/TitleMenu.vue'
import MainGameScene from './components/MainGameScene.vue'
import GameoverMessage from './components/GameoverMessage.vue'
import { useGameStore } from './stores/game'

import death from '@/assets/death.jfif'
import insanity from '@/assets/insanity.jfif'
import victory from '@/assets/victory.jfif'

const game = useGameStore()
</script>

<template>
  <TitleMenu v-if="game.screen === 'title'" />
  <MainGameScene v-if="game.screen === 'game'" />
  <GameoverMessage v-if="game.screen === 'death'" :image="death">
    You died
  </GameoverMessage>
  <GameoverMessage v-if="game.screen === 'insanity'" :image="insanity">
    Your mind cannot take anymore
  </GameoverMessage>
  <GameoverMessage v-if="game.screen === 'victory'" :image="victory">
    You completed your quest
  </GameoverMessage>
</template>

<style scoped></style>
