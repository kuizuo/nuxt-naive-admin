import type { User } from '@supabase/supabase-js'
import { serverSupabaseUser } from '#supabase/server'

declare module 'h3' {
  interface H3EventContext {
    _user: User
  }
}

const whitelist: string[] = []

export default defineEventHandler(async (event) => {
  const { context, node: { req } } = event

  if (!req.url.startsWith('/api/admin'))
    return

  try {
    const user = await serverSupabaseUser(event)

    if (whitelist.includes(req.url!))
      return

    if (user?.aud !== 'authenticated')
      throw createError({ statusMessage: '请登录后再操作', statusCode: 401 })

    // context._user = user
  }
  catch (err) {
    throw createError({ statusMessage: err.message })
  }
})
