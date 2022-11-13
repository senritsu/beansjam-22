import monolith from '@/assets/monolith.jfif'
import flame from '@/assets/flame.jfif'
import flame2 from '@/assets/flame2.jfif'
import northernLights from '@/assets/northernLights.jfif'

export type Dream = {
  image: string
  sanity: number
}
export default [
  {
    weight: 1,
    image: monolith,
    sanity: +5,
  },
  {
    weight: 2,
    image: flame,
    sanity: -10,
  },
  {
    weight: 1,
    image: flame2,
    sanity: -15,
  },
  {
    weight: 2,
    image: northernLights,
    sanity: -5,
  },
]
