import type { PrismaClient } from '@prisma/client'
import { prisma } from '~~/server/utils/db'

declare module 'h3' {
  interface H3EventContext {
    prisma: PrismaClient
  }
}

export default eventHandler((event) => {
  event.context.prisma = prisma
})
