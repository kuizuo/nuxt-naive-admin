<script setup lang="ts">
import type { Repo } from '~~/types'
const props = defineProps<{
  repos: Repo[]
}>()
</script>

<template>
  <div v-if="props.repos?.length > 0" class="mt-2">
    <n-list hoverable clickable bordered>
      <n-list-item v-for="repo in props.repos" :key="repo.id">
        <n-thing content-style="margin-top: 10px;">
          <template #header>
            <div inline-flex items-center font-sans>
              <h2 text-xl>
                {{ repo.name }}
              </h2>
              <a :href="repo.html_url" target="_blank" ml-1 inline-flex items-center>
                <i i-ri-star-s-fill inline-block cursor-pointer text-amber-400 mr-1 />
                {{ repo.stargazers_count }}
              </a>
            </div>
          </template>
          <template #description>
            <n-space size="small" style="margin-top: 4px">
              <n-tag v-for="topic in repo.topics" :key="topic" :bordered="false" type="info" size="small">
                {{ topic }}
              </n-tag>
            </n-space>
          </template>
          <p class="text-left">
            {{ repo.description }}
          </p>
        </n-thing>
        <template #suffix>
          <a :href="repo.html_url" target="_blank">
            <n-button type="primary">进入仓库</n-button>
          </a>
        </template>
      </n-list-item>
    </n-list>
  </div>
</template>

<style scoped>
</style>
