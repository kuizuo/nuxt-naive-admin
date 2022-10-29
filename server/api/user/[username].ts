import { Github } from '~~/server/protocol/github'

export default defineEventHandler(async (event) => {
  const { username } = event.context.params

  const user = await Github.getUser(username)
  await useStorage().setItem(`db:github:user:${username}`, user)

  return user
})
