import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  // Production
  storage: {
    db: {
      driver: 'fs',
      base: './data/db',
    },
  },
  // Development
  devStorage: {
    db: {
      driver: 'fs',
      base: './data/db',
    },
  },
})
