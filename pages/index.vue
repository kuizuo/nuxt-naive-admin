<script setup lang="tsx">
import { NAvatar, NButton, NEmpty, NList, NListItem, NSpace, NTag, NThing } from 'naive-ui'

const username = ref('')

const { data: user, pending, execute } = await useAsyncData(async () => {
  if (!username.value)
    return null
  return (await request(`/api/github/user/${username.value}`)).data as Github.User
})

async function handleQuery() {
  await execute()
}

function reset() {
  username.value = ''
  user.value = null
}

function Info({ user }: { user: Github.User }) {
  return <div>
    <NAvatar size={100} src={user!.avatar_url} />
    <h2 class="text-xl font-bold">
      <a href={user.blog} target="_blank" class="transition hover:text-green-500">
        {user.name}
      </a>
    </h2>
    <div class="flex justify-center items-center gap-4">
      <a
        class="flex flex-col cursor-pointer hover:text-green-600 transition"
        href={`https://github.com/${user.login}?tab=following`} target="_blank"
      >
        <p>{user.following}</p>
        <p>关注</p>
      </a>
      <a
        class="flex flex-col cursor-pointer hover:text-green-600 transition"
        href={`https://github.com/${user.login}?tab=followers`} target="_blank"
      >
        <p>{user.followers}</p>
        <p>粉丝</p>
      </a>
    </div>
  </div>
}

function Repo({ repos }: { repos: Github.Repo[] }) {
  if (!repos || repos?.length === 0)
    return <NEmpty description="暂无仓库" />

  return (
    <div class="mt-2">
      <NList hoverable clickable bordered>
        {repos.map(repo => (
          <NListItem key={repo.id}>
            {{
              default: () => <NThing content-style="margin-top: 10px;">
                {{
                  default: () => <p class="text-left">
                    {repo.description}
                  </p>,
                  header: () => <div class="inline-flex items-center font-sans">
                    <h2 class="text-xl">
                      {repo.name}
                    </h2>
                    <a href={repo.html_url} target="_blank" class="ml-1 inline-flex items-center">
                      <i class="i-ri-star-s-fill inline-block cursor-pointer text-amber-400 mr-1" />
                      {repo.stargazers_count}
                    </a>
                  </div>,
                  description: () => <NSpace size="small" class="mt-1">
                    {repo.topics.map(topic => (
                      <NTag key={topic} bordered={false} type="info" size="small">
                        {topic}
                      </NTag>
                    ))}
                  </NSpace>,
                }}
              </NThing>,
              suffix: () => <a href={repo.html_url} target="_blank">
                <NButton type="primary">查看仓库</NButton>
              </a>,
            }}
          </NListItem>
        ))}
      </NList>
    </div>)
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
            <NSpace justify="center" inline>
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
            <Info :user="user" />
            <Repo :repos="user.repos" />
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
