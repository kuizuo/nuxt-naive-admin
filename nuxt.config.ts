import { i18n } from './config/i18n'

export default defineNuxtConfig({
  app: {
    keepalive: true,
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:8010',
      adminUid: process.env.NUXT_PUBLIC_ADMIN_UID,
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
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
    ],
  },
  components: [
    {
      path: '~/components/global',
      global: true,
    },
    {
      path: '~/components',
      extensions: ['vue'],
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
      exclude: ['/', '/auth/reset-password', '/auth/update-password'],
    },
  },
  css: ['~/assets/css/main.css'],
  routeRules: {
    '/': { prerender: true },
    '/admin/**': { swr: false },
    '/api/**': { cors: true },
  },
  experimental: {
    componentIslands: true,
  },
  i18n,
  devtools: {
    enabled: true,
  },
})
