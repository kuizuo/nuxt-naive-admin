import { Github } from '~~/server/protocol/github'

export default defineEventHandler(async (event) => {
  const { username } = event.context.params as { username: string }

  const repos = await Github.getRepos(username)
  return ResOp.success(repos)
})
