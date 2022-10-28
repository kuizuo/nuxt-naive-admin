import { useMessage } from 'naive-ui'

export const useUserStore = definePiniaStore('user', () => {
  const user = ref<API.User | null>(null)
  const repos = ref<API.Repo[]>([])
  const message = useMessage()

  async function getUser(username: string) {
    const json = await (await fetch(`/api/user/${username}`)).json()
    if (json.login) {
      user.value = json
      message.success('获取成功')
    }
    else {
      message.error('用户不存在')
    }
  }

  async function getRepos() {
    const username = user.value?.login
    const json = await (await fetch(`/api/repo/${username}`)).json()
    repos.value = json
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
