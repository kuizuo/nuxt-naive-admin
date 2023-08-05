import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import { NuxtAuthHandler } from '#auth'
import { prisma } from '~~/server/utils/db'

interface Credentials {
  username: string
  password: string
}

export default NuxtAuthHandler({
  secret: process.env.NUXT_SECRET,
  providers: [
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'admin' },
        password: { label: 'Password', type: 'password', placeholder: '123456' },
      },
      async authorize(credentials: Credentials) {
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { name: credentials.username },
              { email: credentials.username },
            ],
            password: credentials.password,
          },
        })

        if (!user) {
          throw createError({
            statusCode: 403,
            statusMessage: 'Invalid credentials',
          })
        }

        return user
      },
    }),
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    GithubProvider.default({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
})
