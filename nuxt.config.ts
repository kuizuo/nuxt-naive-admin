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
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'definePiniaStore'],
    }],
    '@pinia-plugin-persistedstate/nuxt',
    '@sidebase/nuxt-auth',
    '@huntersofbook/naive-ui-nuxt',
    'nuxt-icon',
    '@nuxt/devtools',
  ],
  imports: {
    dirs: [
      'composables/**/*',
      'stores/**/*',
      // 'api/**/*',
    ],
  },
  components: [
    {
      path: '~/components',
      extensions: ['vue'],
    },
    {
      path: '~/components/global',
      global: true,
    }
  ],
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
  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
        sepia: 'monokai',
      },
    },
  },
  routeRules: {
    '/changelog': { static: true },
    '/help': { static: true },
    '/admin/**': { ssr: false },
    '/api/**': { cors: true },
  },
  auth: {
    enableGlobalAppMiddleware: true,
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
