import { Github } from '~~/server/protocol/github'

export default defineEventHandler(async (event) => {
  const { username } = event.context.params

  return Github.getRepos(username)
})
