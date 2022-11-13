<script setup lang="ts">
import TitleMenu from './components/TitleMenu.vue'
import MainGameScene from './components/MainGameScene.vue'
import { useGameStore } from './stores/game'

const game = useGameStore()
</script>

<template>
  <TitleMenu v-if="game.screen === 'title'" />
  <MainGameScene v-if="game.screen === 'game'" />
</template>

<style scoped></style>
