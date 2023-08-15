import { Role } from '~~/constants/role'
import { serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~~/types/database.types'

export default defineEventHandler(async (event) => {
  if (event.context._user?.role !== Role.Admin)
    throw createError({ statusMessage: '无权限' })

  const id = getRouterParam(event, 'id')

  if (!id)
    throw createError({ statusMessage: '无效的用户 ID' })

  const { auth } = await serverSupabaseServiceRole<Database>(event)

  const { data, error } = await auth.admin.deleteUser(id)

  if (error)
    throw createError({ statusMessage: error.message })
})
