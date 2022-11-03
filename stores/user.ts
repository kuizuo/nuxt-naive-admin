import { useMessage } from 'naive-ui'

export const useUserStore = definePiniaStore('user', () => {
  const user = ref<API.User | null>(null)
  const repos = ref<API.Repo[]>([])
  const message = useMessage()

  async function getUser(username: string) {
    const { data } = await request(`/api/user/${username}`)
    if (data.login) {
      user.value = data
      message.success('获取成功')
    }
    else {
      message.error(data.message)
    }
  }

  async function getRepos() {
    const username = user.value?.login
    const { data } = await request(`/api/repo/${username}`)
    repos.value = data
  }

  async function reset() {
    user.value = null
    repos.value = []
  }

  return {
    user,
    repos,
    getUser,
    getRepos,
    reset,
  }
}, {
  persist: {
    key: 'user',
  },
})
