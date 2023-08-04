<script setup lang="ts">
const color = useColorMode()

const isDark = computed(() => color.value === 'dark')
function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button class="!outline-none" @click="toggleDark">
    <Icon v-if="isDark" name="ri:moon-line" />
    <Icon v-else name="ri:sun-line" />
  </button>
</template>
