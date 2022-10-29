import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  // Production
  storage: {
    db: {
      driver: 'fs',
      base: './data/db',
    },
    redis: {
      driver: 'redis',
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
