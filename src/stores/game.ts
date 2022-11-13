import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRafFn } from '@vueuse/core'

import type { Action, Outcome } from '@/locations'
import locations from '@/locations'
import dreams, { type Dream } from '@/dreams'

export type Screen = 'title' | 'game' | 'death' | 'insanity' | 'victory'

const energyRecoveryRate = 4
const defaultFatigueBuildup = 6
const defaultDreamCooldown = 2
const defaultDreamDuration = 5

const weightedRandomChoice = <T extends { weight?: number }>(array: T[]) => {
  const weighted = array.reduce((all, item) => {
    all.push(...(Array.from({ length: item.weight ?? 1 }).fill(item) as T[]))
    return all
  }, [] as T[])

  return weighted[Math.floor(Math.random() * weighted.length)]
}

const clamp = (value: number) => Math.min(100, Math.max(0, value))

export const useGameStore = defineStore('game', () => {
  const screen = ref<Screen>('title')

  const health = ref(0)
  const sanity = ref(0)
  const stamina = ref(0)
  const fatigue = ref(0)

  const items = ref<string[]>([])

  const currentLocationId = ref('start')
  const visitedLocations = ref(new Set<string>(['start']))
  const completedActions = ref(new Set<string>())

  const currentLocation = computed(() => {
    const location = locations.find((x) => x.id === currentLocationId.value)
    if (!location) {
      throw new Error('invalid location')
    }
    return location
  })

  let paused = true
  let lastFrame = performance.now() / 100

  const activeDream = ref<Dream>()
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

    if (activeDream.value && dreamCheckCooldown <= 0) {
      console.log('dream finished')
      activeDream.value = undefined
    }

    // check to show dreams
    if (!activeDream.value && fatigue.value >= 70 && dreamCheckCooldown <= 0) {
      console.log('dream check')
      dreamCheckCooldown = defaultDreamCooldown
      if (Math.random() <= 0.3) {
        console.log('DREAM!')
        activeDream.value = weightedRandomChoice(dreams)
        dreamCheckCooldown = defaultDreamDuration
        sanity.value = clamp(sanity.value + activeDream.value.sanity)
      }
    }

    dreamCheckCooldown -= dt
    stamina.value = Math.min(100, stamina.value + dt * energyRecoveryRate)
    fatigue.value = Math.min(100, fatigue.value + dt * defaultFatigueBuildup)
  })

  const pendingOutcome = ref<Outcome | undefined>()

  const availableActions = computed(() => {
    return currentLocation.value.actions.filter((action) => {
      console.log({ action })
      const stillAvailable =
        !action.id || !completedActions.value.has(action.id)
      const prerequisitesMet =
        !action.prerequisites?.length ||
        action.prerequisites.every((id) => completedActions.value.has(id))

      return stillAvailable && prerequisitesMet
    })
  })

  const chooseAction = (action: Action) => {
    paused = true

    if (action.id) {
      completedActions.value.add(action.id)
    }

    const outcome = weightedRandomChoice(action.outcomes)

    pendingOutcome.value = outcome
  }

  const acceptOutcome = () => {
    if (!pendingOutcome.value) return

    const outcome = pendingOutcome.value

    health.value = clamp(health.value + (outcome.health ?? 0))
    sanity.value = clamp(sanity.value + (outcome.sanity ?? 0))
    stamina.value = clamp(stamina.value + (outcome.stamina ?? 0))
    fatigue.value = clamp(fatigue.value + (outcome.fatigue ?? 0))

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
    fatigue.value = clamp(fatigue.value - 70)
  }

  const visibleLocations = computed(() => {
    return new Set(
      [...visitedLocations.value].concat(currentLocation.value.connectedTo)
    )
  })

  const startGame = () => {
    lastFrame = performance.now() / 1000

    screen.value = 'game'

    pendingOutcome.value = {
      description:
        'Your dreams have lead you here. The artifact seems to draw you to the top of that mountain. Maybe there you will find peace.',
    }

    paused = true
  }

  const reset = () => {
    health.value = 100
    sanity.value = 80
    stamina.value = 50
    fatigue.value = 20

    activeDream.value = undefined
    pendingOutcome.value = undefined
    dreamCheckCooldown = 0
    visitedLocations.value.clear()
    completedActions.value.clear()
    currentLocationId.value = 'start'
    visitedLocations.value.add('start')

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
    completedActions,
    availableActions,
    chooseAction,
    pendingOutcome,
    acceptOutcome,
    items,
    activeDream,
  }
})
