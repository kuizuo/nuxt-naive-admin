import { serverSupabaseServiceRole } from '#supabase/server'
import { Role } from '~~/constants/role'
import type { Database } from '~~/types/database.types'

export default defineEventHandler(async (event) => {
  if (event.context._user?.role !== Role.Admin)
    throw createError({ statusMessage: '无权限' })

  const { page, pageSize } = getQuery(event) as { page: number; pageSize: number }

  const { auth } = await serverSupabaseServiceRole<Database>(event)

  const { data, error } = await auth.admin.listUsers({ page, perPage: pageSize })

  if (error)
    throw createError({ statusMessage: error.message })

  return data
})
