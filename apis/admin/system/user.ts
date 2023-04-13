export interface UserItem {
  id: string
  username: string
  email: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface CreateUserDto {
  name: string
  email: string
  password: string
  // roles: number[]
}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

enum Api {
  Base = '/api/system/users',
}

export const getUserList = async (params: any) =>
  await request(Api.Base, { method: 'GET', params })

export const getUserDetail = async (id: string) =>
  await request(`${Api.Base}/${id}`, { method: 'GET' })

export const createUser = async (body: CreateUserDto) =>
  await request(Api.Base, { method: 'POST', body })

export const updateUser = async (id: string, body: UpdateUserDto) =>
  await request(`${Api.Base}/${id}`, { method: 'PUT', body })

export const deleteUser = async (id: string) =>
  await request(`${Api.Base}/${id}`, { method: 'DELETE' })
