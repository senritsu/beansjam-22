import { setup } from '@storybook/vue3'
import { createPinia } from 'pinia'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

setup((app) => {
  const pinia = createPinia()

  app.use(pinia)
})
