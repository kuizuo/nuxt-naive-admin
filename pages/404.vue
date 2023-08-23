<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main class="px-4 py-10 text-center text-teal-700 dark:text-gray-200">
    <NResult status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <NSpace justify="center">
          <NButton @click="router.back()">
            Back
          </NButton>
          <NButton @click="router.push('/')">
            Home
          </NButton>
        </NSpace>
      </template>
    </NResult>
  </main>
</template>
