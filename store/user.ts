import { acceptHMRUpdate, defineStore } from 'pinia'
import { useMessage } from 'naive-ui'
import type { User } from '~/types'

const namespace = 'github'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const message = useMessage()

  // fetch user data
  async function findUser(username: string) {
    try {
      const json = await (await fetch(`/api/users/${username}`)).json()
      // 用户不存在
      if (json.login) {
        user.value = json
        message.success('获取成功')
      }
      else {
        message.error('用户不存在')
      }
    }
    catch (error) {
      message.error(error.message)
    }
  }

  async function findRepos() {
    if (!user.value)
      return

    const json = await (await fetch(`/api/users/${user.value!.login}/repos`)).json()
    user.value!.repos = json
  }

  return {
    user,
    findUser,
    findRepos,
  }
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        key: `${namespace}-user`,
        // 此处 如果 在nuxt3 中直接使用 localStorage 或 sessionStorage 会报一个错
        storage: process.client ? localStorage : null,
      },
    ],
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
