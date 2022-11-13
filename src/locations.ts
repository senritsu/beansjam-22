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
}

const locations: Location[] = [
  {
    id: 'start',
    name: 'Coastal base camp',
    pos: { x: 25, y: 85 },
    image: coast,
    connectedTo: ['forest'],
  },
  {
    id: 'forest',
    name: 'A sparse forest approaching the mountains',
    pos: { x: 35, y: 75 },
    image: forest,
    connectedTo: ['corridor', 'crater'],
  },
  {
    id: 'crater',
    name: 'A smoldering crater',
    pos: { x: 52, y: 72 },
    image: crater,
    connectedTo: ['corridor'],
  },
  {
    id: 'corridor',
    name: 'A passageway through the rocks',
    pos: { x: 45, y: 62 },
    image: cave,
    connectedTo: ['foothills'],
  },
  {
    id: 'foothills',
    name: 'Shelter on the mountainside',
    pos: { x: 55, y: 50 },
    image: foothills,
    connectedTo: ['clearing'],
  },
  {
    id: 'clearing',
    name: 'A small clearing in the forest',
    pos: { x: 57, y: 45 },
    image: forest2,
    connectedTo: ['ridge', 'forest2'],
  },
  {
    id: 'ridge',
    name: 'A ridge overlooking a sharp drop',
    pos: { x: 48, y: 35 },
    image: ridge2,
    connectedTo: ['stormyRidge'],
  },
  {
    id: 'stormyRidge',
    name: 'A foggy mountain path',
    pos: { x: 55, y: 23 },
    image: blizzard,
    connectedTo: ['peak'],
  },
  {
    id: 'forest2',
    name: 'Large stone spires',
    pos: { x: 66, y: 40 },
    image: forest3,
    connectedTo: ['cave'],
  },
  {
    id: 'cave',
    name: 'Tunnels leading further up the mountain',
    pos: { x: 68, y: 32 },
    image: cave2,
    connectedTo: ['peak'],
  },
  {
    id: 'peak',
    name: 'The monolith',
    pos: { x: 53, y: 8 },
    image: monolith,
    connectedTo: [],
  },
]

export default locations
