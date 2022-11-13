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
        description: 'You burned yourself on the fire',
      },
      {
        weight: 5,
        fatigue: -10,
        description: 'Tending to the fire keeps you awake',
      },
      {
        weight: 1,
        fatigue: -20,
        sanity: -5,
        description:
          'The flames seem familiar. They remind you of your dreams.',
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
    name: 'Eat your rations',
    outcomes: [
      {
        description:
          'Not particularly tasty, but nourishing. Unfortunately you have nothing left.',
        health: +5,
        stamina: +20,
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
        weight: 3,
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
    actions: [actions.tendTheFire, actions.eatRations],
  },
  {
    id: 'clearing',
    name: 'A small clearing in the forest',
    pos: { x: 57, y: 45 },
    image: forest2,
    connectedTo: ['ridge', 'forest2'],
    actions: [actions.tendTheFire, actions.eatRations, actions.huntForFood],
  },
  {
    id: 'ridge',
    name: 'A ridge overlooking a sharp drop',
    pos: { x: 48, y: 35 },
    image: ridge2,
    connectedTo: ['stormyRidge'],
    actions: [actions.tendTheFire, actions.eatRations],
  },
  {
    id: 'stormyRidge',
    name: 'A foggy mountain path',
    pos: { x: 55, y: 23 },
    image: blizzard,
    connectedTo: ['peak'],
    actions: [actions.tendTheFire, actions.eatRations],
  },
  {
    id: 'forest2',
    name: 'Large stone spires',
    pos: { x: 66, y: 40 },
    image: forest3,
    connectedTo: ['cave'],
    actions: [actions.tendTheFire, actions.eatRations, actions.huntForFood],
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
      actions.collectMushrooms,
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
