<script lang="ts" setup>
const { title } = useAppConfig()
</script>

<template>
  <NuxtLink to="/" flex="~ gap-2" items-center dark="text-white">
    <i i-carbon-api />
    <div font-sans leading-1em text-left text-sm capitalize>
      {{ title }}
    </div>
  </NuxtLink>
</template>
