import { Github } from '~~/server/protocol/github'
import { ResOp } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const { username } = event.context.params

  const repos = await Github.getRepos(username)
  return ResOp.success(repos)
})
