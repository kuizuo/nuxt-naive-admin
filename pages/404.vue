<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:text-gray-200">
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <n-space justify="center">
          <n-button @click="router.back()">
            Back
          </n-button>
          <n-button @click="router.push('/')">
            Home
          </n-button>
        </n-space>
      </template>
    </n-result>
  </main>
</template>
