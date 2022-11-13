import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRafFn } from '@vueuse/core'

import locations from '@/locations'

export type Screen = 'title' | 'menu' | 'game' | 'gameover'

const energyRecoveryRate = 50

export const useGameStore = defineStore('game', () => {
  const screen = ref<Screen>('title')
  const energy = ref(0)
  const sanity = ref(100)
  const items = ref<string[]>([])

  const currentLocationId = ref('start')
  const visitedLocations = ref(new Set<string>(['start']))

  const currentLocation = computed(() => {
    const location = locations.find((x) => x.id === currentLocationId.value)
    if (!location) {
      throw new Error('invalid location')
    }
    return location
  })

  let t0 = performance.now()
  const { pause, resume } = useRafFn(
    () => {
      const t1 = performance.now()
      console.log({ energy: energy.value, t0, t1 })
      const dt = (t1 - t0) / 1000
      t0 = t1

      energy.value = Math.min(100, energy.value + dt * energyRecoveryRate)
    },
    { immediate: true }
  )

  const moveTo = (id: string) => {
    if (!canTravel.value || !currentLocation.value.connectedTo.includes(id))
      return

    currentLocationId.value = id
    visitedLocations.value.add(id)
    energy.value = 0
  }

  const visibleLocations = computed(() => {
    return new Set(
      [...visitedLocations.value].concat(currentLocation.value.connectedTo)
    )
  })

  const startGame = () => {
    screen.value = 'game'
  }

  const returnToTitle = () => {
    screen.value = 'title'
  }

  const canTravel = computed(
    () => currentLocation.value.connectedTo.length > 0 && energy.value >= 100
  )

  return {
    screen,
    startGame,
    returnToTitle,
    energy,
    sanity,
    visitedLocations,
    visibleLocations,
    currentLocation,
    canTravel,
    moveTo,
    items,
  }
})
