import { Github } from '~~/server/protocol/github'
import { ResOp } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const { username } = event.context.params

  const user = await Github.getUser(username)

  if (!user.login)
    throw createError({ statusCode: 404, message: user.message ?? 'User not found' })

  await useStorage().setItem(`db:github:user:${username}`, user)

  return ResOp.success(user)
})
