<script setup lang="ts">
const userStore = useUserStore()
const repos = computed(() => userStore.repos)

const loading = ref(false)

async function getRepos() {
  loading.value = true
  try {
    await userStore.getRepos()
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div v-if="repos?.length > 0" class="mt-2">
      <n-list hoverable clickable bordered>
        <n-list-item v-for="repo in repos" :key="repo.id">
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
              <n-space size="small" mt-1>
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
    <n-button v-else class="!mt-1" :loading="loading" @click="getRepos()">
      查看他的仓库列表
    </n-button>
  </div>
</template>

<style scoped>

</style>
