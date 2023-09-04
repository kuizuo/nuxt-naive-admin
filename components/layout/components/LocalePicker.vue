<script lang="ts" setup>
import type { LocaleObject } from '#i18n'

const { locale, locales, setLocaleCookie } = useI18n()

const options = computed(() => {
  return (locales.value as LocaleObject[]).map(l => ({ label: l.name, value: l.code }))
})

function setLocale(code: string) {
  setLocaleCookie(code)
}
</script>

<template>
  <NPopselect v-model:value="locale" :options="options" trigger="hover" size="medium" @update:value="setLocale">
    <span>
      <Icon name="ion:language" class="cursor-pointer" />
    </span>
  </NPopselect>
</template>
