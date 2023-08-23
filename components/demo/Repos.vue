<script setup lang="ts">
defineProps<{
  repos: API.Github.Repo[]
}>()
</script>

<template>
  <div v-if="repos?.length! > 0" class="mt-2">
    <NList hoverable clickable bordered>
      <NListItem v-for="repo in repos" :key="repo.id">
        <NThing content-style="margin-top: 10px;">
          <template #header>
            <div class="inline-flex items-center font-sans">
              <h2 class="text-xl">
                {{ repo.name }}
              </h2>
              <a :href="repo.html_url" target="_blank" class="ml-1 inline-flex items-center">
                <i class="i-ri-star-s-fill inline-block cursor-pointer text-amber-400 mr-1" />
                {{ repo.stargazers_count }}
              </a>
            </div>
          </template>
          <template #description>
            <NSpace size="small" class="mt-1">
              <NTag v-for="topic in repo.topics" :key="topic" :bordered="false" type="info" size="small">
                {{ topic }}
              </NTag>
            </NSpace>
          </template>
          <p class="text-left">
            {{ repo.description }}
          </p>
        </NThing>
        <template #suffix>
          <a :href="repo.html_url" target="_blank">
            <NButton type="primary">查看仓库</NButton>
          </a>
        </template>
      </NListItem>
    </NList>
  </div>
  <div v-else>
    <NEmpty description="暂无仓库" />
  </div>
</template>
