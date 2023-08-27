export default defineAppConfig({
  docus: {
    title: 'Nuxt Naive Admin',
    description: '一站式管理系统，融合 Nuxt、Naive UI 和 Supabase',
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
