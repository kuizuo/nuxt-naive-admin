import piniaPersist from 'pinia-plugin-persist'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$pinia?.use(piniaPersist)
})
