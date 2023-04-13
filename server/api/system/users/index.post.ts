import type { CreateUserDto } from '~~/apis/admin/system/user'

export default defineEventHandler(async (event) => {
  const body = await readBody<CreateUserDto>(event)

  const user = await event.context.prisma.user.create({
    data: {
      ...body,
    },
  })

  return ResOp.success(user)
})
