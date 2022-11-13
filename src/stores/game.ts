import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRafFn } from '@vueuse/core'

import type { Action, Outcome } from '@/locations'
import locations from '@/locations'

export type Screen = 'title' | 'game' | 'death' | 'insanity' | 'victory'

const energyRecoveryRate = 5
const defaultFatigueBuildup = 10
const defaultDreamCooldown = 1

const weightedRandomChoice = <T extends { weight?: number }>(array: T[]) => {
  const weighted = array.reduce((all, item) => {
    all.push(...(Array.from({ length: item.weight ?? 1 }).fill(item) as T[]))
    return all
  }, [] as T[])

  return weighted[Math.floor(Math.random() * weighted.length)]
}

export const useGameStore = defineStore('game', () => {
  const screen = ref<Screen>('title')

  const health = ref(0)
  const sanity = ref(0)
  const stamina = ref(0)
  const fatigue = ref(0)

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

  let paused = true
  let lastFrame = performance.now() / 100
  let dreamCheckCooldown = 0
  const { pause, resume } = useRafFn(() => {
    if (paused) return

    const now = performance.now() / 1000
    const dt = now - lastFrame
    lastFrame = now

    // check for gameover
    if (sanity.value <= 0) {
      screen.value = 'insanity'
    }
    if (health.value <= 0) {
      screen.value = 'death'
    }

    // check to show dreams
    if (fatigue.value >= 70 && dreamCheckCooldown <= 0) {
      dreamCheckCooldown = defaultDreamCooldown
      if (Math.random() <= 0.3) {
        // TODO show dream flashes
      }
    }

    dreamCheckCooldown -= dt
    stamina.value = Math.min(100, stamina.value + dt * energyRecoveryRate)
    fatigue.value = Math.min(100, fatigue.value + dt * defaultFatigueBuildup)
  })

  const pendingOutcome = ref<Outcome | undefined>()
  const chooseAction = (action: Action) => {
    paused = true

    const outcome = weightedRandomChoice(action.outcomes)

    pendingOutcome.value = outcome
  }

  const acceptOutcome = () => {
    if (!pendingOutcome.value) return

    const outcome = pendingOutcome.value

    health.value += outcome.health ?? 0
    sanity.value += outcome.sanity ?? 0
    stamina.value += outcome.stamina ?? 0
    fatigue.value += outcome.fatigue ?? 0

    if (outcome.victory) {
      screen.value = 'victory'
      return
    }

    // skip passed time
    lastFrame = performance.now() / 1000
    pendingOutcome.value = undefined
    paused = false
  }

  const moveTo = (id: string) => {
    if (!canTravel.value || !currentLocation.value.connectedTo.includes(id))
      return

    currentLocationId.value = id
    visitedLocations.value.add(id)
    stamina.value = 0
  }

  const visibleLocations = computed(() => {
    return new Set(
      [...visitedLocations.value].concat(currentLocation.value.connectedTo)
    )
  })

  const startGame = () => {
    lastFrame = performance.now() / 1000

    screen.value = 'game'

    paused = false
  }

  const reset = () => {
    health.value = 100
    sanity.value = 80
    stamina.value = 50
    fatigue.value = 20

    paused = true
  }

  const returnToTitle = () => {
    reset()
    screen.value = 'title'
  }

  const canTravel = computed(
    () =>
      currentLocation.value.connectedTo.length > 0 &&
      stamina.value >= 100 &&
      !pendingOutcome.value
  )

  reset()

  return {
    screen,
    health,
    sanity,
    stamina,
    fatigue,
    startGame,
    returnToTitle,
    visitedLocations,
    visibleLocations,
    currentLocation,
    canTravel,
    moveTo,
    chooseAction,
    pendingOutcome,
    acceptOutcome,
    items,
  }
})
