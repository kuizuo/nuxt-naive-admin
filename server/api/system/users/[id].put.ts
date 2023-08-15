import { Role } from '~~/constants/role'
import { serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~~/types/database.types'

interface Body {
  id: string
  email: string
  username: string
  avatar_url: string
}

export default defineEventHandler(async (event) => {
  if (event.context._user?.role !== Role.Admin)
    throw createError({ statusMessage: '无权限' })

  const { id, email, username, avatar_url } = await readBody<Body>(event)

  const { auth } = await serverSupabaseServiceRole<Database>(event)

  const { data, error } = await auth.admin.updateUserById(id,
    {
      email,
      user_metadata: {
        user_name: username,
        avatar_url,
      },
    })

  if (error)
    throw createError({ statusMessage: error.message })
})
