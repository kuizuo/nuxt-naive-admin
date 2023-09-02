<script setup lang="ts">
import { darkTheme, dateZhCN, lightTheme, zhCN } from 'naive-ui'

const { locale } = useI18n()
const colorMode = useColorMode()
const { title, description } = useAppConfig()
const { themeColor } = useAppSetting()

const theme = computed(() => colorMode.value === 'dark' ? darkTheme : lightTheme)

const themeOverrides = computed(() => {
  const color = unref(themeColor)
  const lightenStr = lighten(color, 6)
  return {
    common: {
      primaryColor: color,
      primaryColorHover: lightenStr,
      primaryColorPressed: lightenStr,
      primaryColorSuppl: color,
    },
  }
})

useHead({
  htmlAttrs: {
    lang: () => locale.value,
  },
  title,
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' },
  ],
  meta: [
    { name: 'keywords', content: 'nuxt, naive-ui, supabase, template, web' },
    { name: 'description', content: description },
    { name: 'referrer', content: 'no-referrer' },
    // open graph social image
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/og.png' },
    { property: 'og:image:width', content: '2000' },
    { property: 'og:image:height', content: '1000' },
    { property: 'og:site_name', content: title },
  ],
})
</script>

<template>
  <NConfigProvider
    :locale="locale === 'zh-CN' ? zhCN : null"
    :date-locale="locale === 'zh-CN' ? dateZhCN : null"
    :theme="theme" :theme-overrides="themeOverrides"
    :inline-theme-disabled="true"
  >
    <NuxtLoadingIndicator :color="themeColor" />

    <NMessageProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </NMessageProvider>

    <NGlobalStyle />
  </NConfigProvider>
</template>
