import coast from '@/assets/coast.jfif'
import forest from '@/assets/forest.jfif'
import cave from '@/assets/cave.jfif'
import cave2 from '@/assets/cave2.jfif'
import forest2 from '@/assets/forest2.jfif'
import forest3 from '@/assets/forest3.jfif'
import foothills from '@/assets/foothills.jfif'
import ridge2 from '@/assets/ridge2.jfif'
import blizzard from '@/assets/blizzard.jfif'
import peak from '@/assets/peak.jfif'
import crater from '@/assets/crater.jfif'
import monolith from '@/assets/monolith.jfif'

export type Coord = {
  x: number
  y: number
}
export type Location = {
  id: string
  name: string
  pos: Coord
  image: string
  connectedTo: string[]
  actions: Action[]
}
export type Action = {
  id?: string
  prerequisites?: string[]
  requirements?: string[]
  name: string
  outcomes: Outcome[]
}
export type Outcome = {
  description: string
  weight?: number
  health?: number
  sanity?: number
  stamina?: number
  fatigue?: number
  victory?: boolean
}

const actions: { [name: string]: Action } = {
  tendTheFire: {
    name: 'Tend the fire',
    outcomes: [
      {
        weight: 1,
        health: -20,
        fatigue: -10,
        description: 'You burned yourself on the fire.',
      },
      {
        weight: 5,
        fatigue: -10,
        description: 'Tending to the fire keeps you busy.',
      },
      {
        weight: 2,
        fatigue: -20,
        sanity: -5,
        description: 'Some noise startles you. You hope it was just an animal.',
      },
      {
        weight: 1,
        fatigue: -10,
        sanity: -5,
        description:
          'Some of the embers seem to form patterns, resembling your visions of the monolith.',
      },
      {
        weight: 3,
        stamina: +10,
        fatigue: -15,
        health: +5,
        description: 'The warmth of the fire soothers your aching muscles.',
      },
      {
        weight: 1,
        fatigue: -20,
        sanity: -5,
        description:
          'The flames seem familiar. They remind you of your dreams.',
      },
      {
        weight: 1,
        fatigue: -30,
        sanity: -5,
        description:
          'A murder of crows shrieks while they circle above you, jolting you wide-awake.',
      },
    ],
  },
  offerArtifact: {
    name: 'Offer the artifact',
    outcomes: [
      {
        description:
          'You hold up the artifact to the monolith. It shatters instantly, and dark clouds start gathering. You feel like a giant weight is lifted from you, even if you are not sure what you have unleashed.',
        victory: true,
      },
    ],
  },
  eatRations: {
    id: 'rations',
    name: 'Start eating your rations',
    outcomes: [
      {
        description:
          'Not particularly tasty, but nourishing. You leave some for later.',
        health: +10,
        stamina: +75,
        fatigue: +10,
      },
    ],
  },
  eatRations2: {
    id: 'rations2',
    prerequisites: ['rations'],
    name: 'Eat your rations',
    outcomes: [
      {
        description:
          'You devour the rest of your rations. Unfortunately now there is nothing left.',
        health: +10,
        stamina: +75,
        fatigue: +10,
      },
    ],
  },
  investigateCrater: {
    id: 'crater',
    name: 'Investigate the crater',
    outcomes: [
      {
        description:
          'You find a shard of some crystal resembling your visions of the monolith. Your resolve is strengthening.',
        sanity: +5,
        stamina: +10,
        fatigue: -30,
      },
      {
        description:
          'The crater is perpetually burning, you have never seen anything like it. It is quite unsettling.',
        sanity: -10,
      },
    ],
  },
  huntForFood: {
    name: 'Hunt for food',
    outcomes: [
      {
        weight: 5,
        description:
          'You managed to catch a small animal. You manage to roast it over the fire, which also provides some distraction from your dreams.',
        stamina: +40,
        health: +5,
        fatigue: -20,
      },
      {
        weight: 2,
        description:
          'You stumble down a small ravine, almost breaking your leg.',
        health: -20,
        fatigue: +30,
      },
      {
        weight: 1,
        description:
          'A wild bear attacks you, injuring you gravely. You barely manage to escape with your life.',
        health: -50,
        sanity: -10,
        fatigue: +20,
      },
      {
        weight: 1,
        description:
          'You find some supplies from an old expedition, including some bandages.',
        health: +30,
      },
    ],
  },
  searchCave: {
    name: 'Search the cave',
    outcomes: [
      {
        weight: 1,
        description:
          'Some patterns in these caves are almost hypnotizing. You have to tear yourself from them.',
        sanity: -5,
      },
      {
        weight: 3,
        description:
          'You manage to forage some mushrooms and pray they are not poisonous.',
        stamina: +20,
        health: +5,
      },
      {
        weight: 1,
        description:
          'You remember some of those passages from your dreams. You must be on the right path.',
        sanity: +5,
        fatigue: -10,
      },
    ],
  },
  lookDown: {
    id: 'lookDown',
    name: 'Look down',
    outcomes: [
      {
        weight: 3,
        description:
          'Vertigo overtakes you, you almost stumble down the cliff. You hurry back to your fire.',
        sanity: -10,
        fatigue: -10,
      },
      {
        weight: 6,
        description:
          'Seeing how far you have come elates you. Your purpose is renewed.',
        sanity: +10,
        fatigue: -20,
      },
      {
        weight: 1,
        description: 'You stumble and fall, hitting your head on the rocks.',
        health: -60,
      },
    ],
  },
  studyAscent: {
    id: 'studyAscent',
    name: 'Plan your ascent',
    outcomes: [
      {
        description: 'The climb seems insurmountable. Your spirit wavers.',
        fatigue: +10,
        sanity: -10,
      },
      {
        description:
          'You think you can make out a viable path, it looks like someone left some markings.',
        fatigue: -10,
        sanity: +10,
      },
      {
        description:
          'The vision of the monolith burns in your memory, drawing you towards it.',
        fatigue: -30,
        stamina: +30,
        sanity: -10,
      },
    ],
  },
  rememberCrater: {
    id: 'rememberCrater',
    name: 'Think about the crater',
    prerequisites: ['crater'],
    outcomes: [
      {
        description:
          'The fire of the crater still seems to burn in your mind. You almost feel warmer in this fog.',
        sanity: -5,
        health: +5,
        stamina: +20,
        fatigue: -10,
      },
    ],
  },
}

const locations: Location[] = [
  {
    id: 'start',
    name: 'Coastal base camp',
    pos: { x: 25, y: 85 },
    image: coast,
    connectedTo: ['forest'],
    actions: [actions.tendTheFire, actions.eatRations],
  },
  {
    id: 'forest',
    name: 'A sparse forest approaching the mountains',
    pos: { x: 35, y: 75 },
    image: forest,
    connectedTo: ['corridor', 'crater'],
    actions: [actions.tendTheFire, actions.eatRations, actions.huntForFood],
  },
  {
    id: 'crater',
    name: 'A smoldering crater',
    pos: { x: 52, y: 72 },
    image: crater,
    connectedTo: ['corridor'],
    actions: [actions.tendTheFire, actions.investigateCrater],
  },
  {
    id: 'corridor',
    name: 'A passageway through the rocks',
    pos: { x: 45, y: 62 },
    image: cave,
    connectedTo: ['foothills'],
    actions: [actions.tendTheFire, actions.eatRations, actions.searchCave],
  },
  {
    id: 'foothills',
    name: 'Shelter on the mountainside',
    pos: { x: 55, y: 50 },
    image: foothills,
    connectedTo: ['clearing'],
    actions: [actions.tendTheFire, actions.eatRations, actions.studyAscent],
  },
  {
    id: 'clearing',
    name: 'A small clearing in the forest',
    pos: { x: 57, y: 45 },
    image: forest2,
    connectedTo: ['ridge', 'forest2'],
    actions: [
      actions.tendTheFire,
      actions.eatRations,
      actions.eatRations2,
      actions.huntForFood,
    ],
  },
  {
    id: 'ridge',
    name: 'A ridge overlooking a sharp drop',
    pos: { x: 48, y: 35 },
    image: ridge2,
    connectedTo: ['stormyRidge'],
    actions: [
      actions.tendTheFire,
      actions.eatRations,
      actions.eatRations2,
      actions.lookDown,
    ],
  },
  {
    id: 'stormyRidge',
    name: 'A foggy mountain path',
    pos: { x: 55, y: 23 },
    image: blizzard,
    connectedTo: ['peak'],
    actions: [
      actions.tendTheFire,
      actions.eatRations,
      actions.eatRations2,
      actions.rememberCrater,
    ],
  },
  {
    id: 'forest2',
    name: 'Large stone spires',
    pos: { x: 66, y: 40 },
    image: forest3,
    connectedTo: ['cave'],
    actions: [
      actions.tendTheFire,
      actions.eatRations,
      actions.eatRations2,
      actions.huntForFood,
    ],
  },
  {
    id: 'cave',
    name: 'Tunnels leading further up the mountain',
    pos: { x: 68, y: 32 },
    image: cave2,
    connectedTo: ['peak'],
    actions: [
      actions.tendTheFire,
      actions.eatRations,
      actions.eatRations2,
      actions.searchCave,
    ],
  },
  {
    id: 'peak',
    name: 'The monolith',
    pos: { x: 53, y: 8 },
    image: monolith,
    connectedTo: [],
    actions: [actions.offerArtifact],
  },
]

export default locations
