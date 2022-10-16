<script setup lang="ts">
import { useUserStore } from '~~/store/user'

const message = useMessage()
const username = $ref('kuizuo')
let loading = $ref(false)

const userStore = useUserStore()
const user = $computed(() => userStore.user)

async function getUser() {
  loading = true
  try {
    await userStore.findUser(username)
  }
  catch (error) {
    message.error(error.message)
  }
  loading = false
}
</script>

<template>
  <div flex justify-center>
    <n-card max-w-5xl>
      <n-alert title="演示说明" type="info">
        <div flex items-center>
          调用 github api，获取用户信息。
          <a href="https://docs.github.com/cn/rest/users" target="_blank">
            <n-button type="info" quaternary size="small">
              点我查看文档
            </n-button>
          </a>
        </div>
      </n-alert>

      <div my-4 mx-auto flex justify-center items-center gap-1>
        <n-input v-model:value="username" placeholder="请输入要查询github账号" />
        <n-button type="primary" :loading="loading" :disabled="!username" @click="getUser">
          查询
        </n-button>
      </div>

      <div v-if="user?.login">
        <Info :user="user" />

        <n-button class="!mt-1" @click="userStore.findRepos()">
          查看他的仓库列表
        </n-button>
        <Repos :repos="user.repos" />
      </div>
      <div v-else>
        还未查询账号
      </div>
    </n-card>
  </div>
</template>

<style scoped>
</style>

