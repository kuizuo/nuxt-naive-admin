export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    'naive-ui-nuxt',
    'nuxt-icon',
    '@sidebase/nuxt-auth',
    '@nuxt/devtools',
  ],
  content: {
    documentDriven: false,
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai',
      },
    },
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
  },
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    preflight: false,
  },
  imports: {
    dirs: [
      'composables',
      'composables/*/index.{ts,js,mjs,mts}',
      'composables/**',
      'stores/*/index.{ts,js,mjs,mts}',
      'stores/**',
    ],
  },
  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: false,
    globalMiddlewareOptions: {
      allow404WithoutAuth: true,
    },
  },
  typescript: {
    shim: false,
  },
  devtools: {
    enabled: true,
    vscode: {},
  },
})
