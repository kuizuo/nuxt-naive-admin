export default defineAppConfig({
  docus: {
    title: 'Nuxt Naive Admin',
    description: '使用 Nuxt 框架, 基于 Naive UI 组件库, 以及 Supabase 服务所开发的管理系统',
    image: 'https://nuxt-naive-admin.vercel.app/cover.png',
    socials: {
      github: 'kuizuo/nuxt-naive-admin',
      nuxt: {
        label: 'Nuxt',
        icon: 'simple-icons:nuxtdotjs',
        href: 'https://nuxt.com'
      },
      supabase: {
        label: 'Supabase',
        icon: 'simple-icons:supabase',
        href: 'https://supabase.com'
      }
    },
    aside: {
      level: 0,
      exclude: []
    },
    header: {
      logo: true,
      exclude: [],
    },
    github: {
      owner: "kuizuo",
      repo: "nuxt-naive-admin",
      branch: "main",
      dir: "docs/content",
      edit: true,
    },
  }
})
