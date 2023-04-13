export default defineEventHandler(async (event) => {
  const { id } = event.context.params as unknown as { id: string }

  const user = await event.context.prisma.user.findFirst({
    where: {
      id,
    },
  })

  return ResOp.success(user)
})
