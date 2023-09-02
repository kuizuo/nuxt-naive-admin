<script setup lang="ts">
const router = useRouter()

const { t } = useI18n()
useHead({
  title: t('common.not_found'),
})
</script>

<template>
  <main class="px-4 py-10 text-center text-[--n-color]">
    <NResult status="404" title="404 资源不存在">
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
