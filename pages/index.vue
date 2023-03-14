<script setup lang="ts">
definePageMeta({
  auth: false,
})
</script>

<template>
  <div>
    <Suspense>
      <Demo />
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
