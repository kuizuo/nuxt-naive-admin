export default defineEventHandler(async (event) => {
  const users = await event.context.prisma.user.findMany()

  return ResOp.success(users)
})
