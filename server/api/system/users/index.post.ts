import { serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~~/types/database.types'

interface Body {
  email: string
  password: string
  user_metadata: Record<string, any>
  email_confirm: boolean
}

const { public: { adminUid } } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  if (event.context._user?.id !== adminUid)
    throw createError({ statusMessage: '无权限' })

  const { email, password, user_metadata, email_confirm } = await readBody<Body>(event)

  const { auth } = await serverSupabaseServiceRole<Database>(event)

  const { data, error } = await auth.admin.createUser({
    email,
    password,
    user_metadata,
    email_confirm,
  })

  if (error)
    throw createError({ statusMessage: error.message })

  return data
})
