<script setup lang="ts">
let username = $ref('kuizuo')
let loading = $ref(false)

const userStore = useUserStore()
const user = $computed(() => userStore.user)

async function getUser() {
  loading = true
  try {
    await userStore.getUser(username)
  }
  finally {
    loading = false
  }
}

function reset() {
  userStore.reset()
  username = ''
}
</script>

<template>
  <div flex justify-center>
    <n-card max-w-5xl>
      <n-alert title="演示说明" type="info">
        <div flex items-center>
          使用 github api 获取用户信息
          <a ml-1 href="https://docs.github.com/cn/rest/users" target="_blank">
            <n-button type="info" size="small">
              点我查看文档
            </n-button>
          </a>
        </div>
      </n-alert>

      <div my-4>
        <n-space justify="center">
          <n-input v-model:value="username" placeholder="请输入要查询github账号" />
          <n-button type="primary" :loading="loading" :disabled="!username" @click="getUser">
            查询
          </n-button>
          <n-button v-if="user?.login" type="warning" @click="reset()">
            重置
          </n-button>
        </n-space>
      </div>

      <div v-if="user?.login">
        <Info :user="user" />
        <Repos :repos="user.repos" />
      </div>
    </n-card>
  </div>
</template>

