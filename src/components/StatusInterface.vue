<script setup lang="ts">
import type { Location } from '@/locations'
import { useGameStore } from '@/stores/game'
import LocationName from './LocationName.vue'
import ProgressBar from './ProgressBar.vue'
import DreamFlash from './DreamFlash.vue'

defineProps<{ location: Location }>()

const game = useGameStore()
</script>

<template>
  <div class="ui">
    <DreamFlash
      class="dream"
      v-if="game.activeDream"
      :image="game.activeDream.image"
    />
    <LocationName class="name" :name="location.name" />
    <div class="stats">
      <label>Health</label>
      <ProgressBar :value="game.health / 100" color="red" />
      <label>Sanity</label>
      <ProgressBar :value="game.sanity / 100" color="blue" />
      <label>Stamina</label>
      <ProgressBar :value="game.stamina / 100" color="green" />
      <label>Fatigue</label>
      <ProgressBar :value="game.fatigue / 100" color="purple" />
    </div>
    <div v-if="game.pendingOutcome" class="outcome">
      {{ game.pendingOutcome.description }}
      <button @click="game.acceptOutcome">Ok</button>
    </div>
    <div v-else-if="game.currentLocation.actions.length" class="actions">
      <button
        v-for="action in game.availableActions"
        :key="action.name"
        @click="game.chooseAction(action)"
      >
        {{ action.name }}
      </button>
    </div>
    <div class="settings">
      <button @click="game.returnToTitle">Quit</button>
    </div>
  </div>
</template>

<style scoped>
.ui {
  display: grid;
  grid-template:
    'stats location settings' auto
    'mid mid unused' 1fr
    'actions actions unused' auto / 1fr 2fr 1fr;
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
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.5em;
}

.actions,
.outcome {
  grid-area: actions;
  font-size: 2em;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5em;

  border: 1px solid rgb(170, 170, 170);
  padding: 0.5em;
  border-radius: 0.2em;
  background-color: rgba(0, 0, 0, 0.75);
}

.settings {
  grid-area: settings;
  font-size: 2em;
  justify-self: end;
}

.outcome button,
.actions button,
.settings button {
  border: none;
  background-color: #666;
  border-radius: 0.1em;
  padding: 0.2em;
  color: var(--color-text);
  font-size: 1em;
  cursor: pointer;
}

.dream {
  grid-area: 1 / 1 / 4 / 4;
  pointer-events: none;
}
</style>
