export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:8010',
      supabaseUrl: process.env.SUPABASE_URL,
      adminUid: process.env.ADMIN_UID,
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    ['@pinia/nuxt', {
      autoImports: ['defineStore', 'definePiniaStore'],
    }],
    '@pinia-plugin-persistedstate/nuxt',
    ['@nuxtjs/supabase', {
      autoImports: ['serverSupabaseClient'],
    }],
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
    },
  ],
  colorMode: {
    classSuffix: '',
  },
  tailwindcss: {
    viewer: false,
    exposeConfig: true,
    config: {
      content: [
        'content/**/**.md',
      ],
    },
  },
  supabase: {
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/', '/auth/reset-password', '/auth/update-password', '/changelog', '/help'],
    },
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
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/changelog': { static: true },
    '/help': { static: true },
    '/admin/**': { swr: false },
    '/api/**': { cors: true },
  },
  experimental: {
    componentIslands: true,
  },
  devtools: {
    enabled: true,
  },
})
