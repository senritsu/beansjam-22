import WorldMap from './WorldMap.vue'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/vue/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  component: WorldMap,
}

export const Primary = () => ({
  components: { WorldMap },
  template: '<WorldMap />',
})
