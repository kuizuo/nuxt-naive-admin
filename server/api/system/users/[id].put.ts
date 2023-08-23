import { serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~~/types/database.types'

interface Body {
  email: string
  password?: string
  user_metadata: Record<string, any>
}

const { public: { adminUid } } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
  if (event.context._user?.id !== adminUid)
    throw createError({ statusMessage: '无权限' })

  const id = getRouterParam(event, 'id')
  if (!id)
    throw createError({ statusMessage: '无效的用户 ID' })

  const { email, password, user_metadata } = await readBody<Body>(event)

  const { auth } = await serverSupabaseServiceRole<Database>(event)

  const { data, error } = await auth.admin.updateUserById(id,
    {
      email,
      ...(password && { password }),
      ...(user_metadata && { user_metadata }),
    })

  if (error)
    throw createError({ statusMessage: error.message })

  return data
})
