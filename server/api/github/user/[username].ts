import { serverSupabaseServiceRole } from '#supabase/server'
import type { Database } from '~~/types/database.types'
import { Github } from '~~/server/protocol/github'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseServiceRole<Database>(event)

  const { username } = event.context.params as { username: string }

  const user = await Github.getUser(username)

  if (!user.login)
    throw createError({ statusCode: 404, message: user.message ?? 'User not found' })

  const repos = await Github.getRepos(username)

  const data = { ...user, repos }

  await client.from('github_user').upsert({
    id: user.id,
    name: username,
    avatar_url: user.avatar_url,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
  })

  return ResOp.success(data)
})
