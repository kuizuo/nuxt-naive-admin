import type { UpdateUserDto } from '~~/apis/admin/system/user'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as unknown as { id: string }

  const body = await readBody<UpdateUserDto>(event)
  const user = await event.context.prisma.user.update({
    where: {
      id,
    },
    data: {
      ...body,
    },
  })

  return ResOp.success(user)
})
