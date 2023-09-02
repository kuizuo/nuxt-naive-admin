import type { NuxtI18nOptions } from '@nuxtjs/i18n'
import type { LocaleObject } from '#i18n'

const locales: LocaleObject [] = [
  {
    code: 'zh-CN',
    file: 'zh-CN.json',
    name: '简体中文',
  },
  {
    code: 'en',
    file: 'en.json',
    name: 'English',
  },
]

export const i18n: NuxtI18nOptions = {
  locales,
  lazy: true,
  langDir: 'locales',
  strategy: 'no_prefix',
  defaultLocale: 'zh-CN',
  detectBrowserLanguage: {
    useCookie: true,
    // fallbackLocale: 'zh-CN',
    redirectOn: 'root',
  },
}
