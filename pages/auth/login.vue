<script lang="ts" setup>
const { t } = useI18n()
useHead({
  title: t('action.sign_in'),
})
</script>

<template>
  <div class="min-h-full max-w-md mx-auto flex flex-col justify-center py-4 sm:px-6 lg:px-8">
    <LoginCard />
  </div>
</template>
