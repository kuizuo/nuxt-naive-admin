<script setup>
const props = defineProps({
  error: Object,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="page justify-center items-center">
    <NResult
      :status="error.statusCode?.toString()" :builtin-theme-overrides="{ titleFontSizeMedium: '24px' }"
      :title="error.statusMessage || 'Oops, something went wrong'" :description="error.message"
    >
      <template #footer>
        <NButton @click="handleError">
          Back home
        </NButton>
      </template>
    </NResult>
  </div>
</template>
