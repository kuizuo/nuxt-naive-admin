import { Github } from '~~/server/protocol/github'

export default defineEventHandler(async (event) => {
  const { username } = event.context.params

  const repos = await Github.getRepos(username)
  return repos
})
