<script setup lang="ts">
const username = ref('kuizuo')

const { data: user, pending, execute } = await useLazyAsyncData(async () => {
  return (await request(`/api/github/user/${username.value}`)).data
})

async function handleQuery() {
  await execute()
}

function reset() {
  username.value = ''
  user.value = null
}
</script>

<template>
  <div>
    <Suspense>
      <div class="flex justify-center">
        <n-card class="max-w-5xl">
          <n-alert title="演示说明" type="info">
            <div class="flex items-center">
              使用 github api 获取用户信息
            </div>
          </n-alert>
          <div class="my-4">
            <n-space justify="center">
              <n-input v-model:value="username" placeholder="请输入要查询github账号" />
              <n-button type="primary" :loading="pending" :disabled="!username" @click="handleQuery()">
                查询
              </n-button>
              <n-button v-if="user?.login" type="warning" @click="reset()">
                重置
              </n-button>
            </n-space>
          </div>

          <div v-if="user?.login">
            <DemoInfo :user="user" />
            <DemoRepos :repos="user.repos" />
          </div>
        </n-card>
      </div>
      <template #fallback>
        <div class="opacity-50 italic">
          <span class="animate-pulse">Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
