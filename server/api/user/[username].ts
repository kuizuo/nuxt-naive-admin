import { Github } from '~~/server/protocol/github'
import { ResOp } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const { username } = event.context.params as { username: string }

  const user = await Github.getUser(username)

  if (!user.login)
    throw createError({ statusCode: 404, message: user.message ?? 'User not found' })

  const existingUser = await event.context.prisma.githubUser.findUnique({ where: { id: user.id } })

  if (!existingUser) {
    await event.context.prisma.githubUser.create({
      data: {
        id: user.id,
        name: user.login,
        avatar_url: user.avatar_url,
        followers: user.followers,
        following: user.following,
        updated_at: user.updated_at,
        created_at: user.created_at,
      },
    })
  }

  return ResOp.success(user)
})
