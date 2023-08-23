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
        <NCard class="max-w-5xl">
          <NAlert title="演示说明" type="info">
            <div class="flex items-center">
              使用 github api 获取用户信息
            </div>
          </NAlert>
          <div class="my-4">
            <NSpace justify="center">
              <NInput v-model:value="username" placeholder="请输入要查询github账号" />
              <NButton type="primary" :loading="pending" :disabled="!username" @click="handleQuery()">
                查询
              </NButton>
              <NButton v-if="user?.login" type="warning" @click="reset()">
                重置
              </NButton>
            </NSpace>
          </div>

          <div v-if="user?.login">
            <DemoInfo :user="user" />
            <DemoRepos :repos="user.repos" />
          </div>
        </NCard>
      </div>
      <template #fallback>
        <div class="opacity-50 italic">
          <span class="animate-pulse">Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
