export default defineEventHandler(async (event) => {
  // const { email, password, code } = await readBody(event) as { email: string; password: string; code: string }
  const { email, password } = await readBody(event) as { email: string; password: string }
  const exists = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (exists)
    return ResOp.error(400, 'User already exists')

  const user = await event.context.prisma.user.create({
    data: {
      email,
      name: email,
      password,
    },
  })

  return ResOp.success(user)
})
