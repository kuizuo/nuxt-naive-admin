import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
    '@pinia-plugin-persistedstate/nuxt',
    'naive-ui-nuxt',
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
  unocss: {
    uno: true,
    icons: true,
    attributify: true,
    preflight: false,
  },
  colorMode: {
    classSuffix: '',
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
  devtools: {
    enabled: true,
    vscode: {},
  },
  experimental: {
    reactivityTransform: true,
    viteNode: true,
  },
  typescript: {
    shim: false,
  },
  nitro: {
    // Production
    storage: {
      db: {
        driver: 'fs',
        base: './data/db',
      },
    },
    // Development
    devStorage: {
      db: {
        driver: 'fs',
        base: './data/db',
      },
    },
  },
})
