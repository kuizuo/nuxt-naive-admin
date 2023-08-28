<script lang="tsx" setup>
import type { NavItem } from 'components/admin/workplace/QuickNav.vue'
import type { GroupItem } from 'components/admin/workplace/ProjectCard.vue'
import type { DynamicInfoItem } from 'components/admin/workplace/DynamicInfo.vue'
import WorkplaceHeader from '~/components/admin/workplace/Header.vue'
import ProjectCard from '~/components/admin/workplace/ProjectCard.vue'
import DynamicInfo from '~/components/admin/workplace/DynamicInfo.vue'
import QuickNav from '~/components/admin/workplace/QuickNav.vue'

import avatar from '~/assets/images/avatar.png'
import avatar1 from '~/assets/images/avatar1.png'
import avatar2 from '~/assets/images/avatar2.png'
import avatar3 from '~/assets/images/avatar3.png'
import avatar4 from '~/assets/images/avatar4.png'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: '工作台',
  order: 2,
  icon: 'material-symbols:table-restaurant-outline',
})

const loading = ref(true)

const navItems: NavItem[] = [
  {
    title: '首页',
    icon: 'ion:home-outline',
    color: '#1fdaca',
  },
  {
    title: '仪表盘',
    icon: 'ion:grid-outline',
    color: '#bf0c2c',
  },
  {
    title: '组件',
    icon: 'ion:layers-outline',
    color: '#e18525',
  },
  {
    title: '系统管理',
    icon: 'ion:settings-outline',
    color: '#3fb27f',
  },
  {
    title: '用户管理',
    icon: 'ion:key-outline',
    color: '#4daf1bc9',
  },
  {
    title: '图表',
    icon: 'ion:bar-chart-outline',
    color: '#00d8ff',
  },
]

const dynamicInfoItems: DynamicInfoItem[] = [
  {
    avatar: avatar1,
    name: '威廉',
    date: '刚刚',
    desc: '在 <a>开源组</a> 创建了项目 <a>Vue</a>',
  },
  {
    avatar: avatar2,
    name: '艾文',
    date: '1个小时前',
    desc: '关注了 <a>威廉</a> ',
  },
  {
    avatar: avatar3,
    name: '克里斯',
    date: '1天前',
    desc: '发布了 <a>个人动态</a> ',
  },
  {
    avatar: avatar4,
    name: '皮特',
    date: '3天前',
    desc: '回复了 <a>杰克</a> 的问题 <a>如何进行项目优化？</a>',
  },
  {
    avatar,
    name: '杰克',
    date: '1周前',
    desc: '关闭了问题 <a>如何运行项目</a> ',
  },
  {
    avatar: avatar1,
    name: '威廉',
    date: '2023-06-01 20:00',
    desc: '发布了 <a>个人动态</a> ',
  },
  {
    avatar: avatar1,
    name: '威廉',
    date: '2023-04-01 20:00',
    desc: '推送了代码到 <a>Github</a>',
  },
]

const groupItems: GroupItem[] = [
  {
    title: 'Github',
    icon: 'carbon:logo-github',
    color: '',
    desc: '不要等待机会，而要创造机会。',
    group: '开源组',
    date: '2023-04-01',
  },
  {
    title: 'Vue',
    icon: 'logos:vue',
    color: '',
    desc: '现在的你决定将来的你。',
    group: '算法组',
    date: '2023-04-01',
  },
  {
    title: 'Nuxt',
    icon: 'logos:nuxt-icon',
    color: '#64D98A',
    desc: '没有什么才能比努力更重要。',
    group: '上班摸鱼',
    date: '2023-04-01',
  },
  {
    title: 'Naive UI',
    icon: 'logos:naiveui',
    color: '',
    desc: '热情和欲望可以突破一切难关。',
    group: 'UI',
    date: '2023-04-01',
  },
  {
    title: 'Supabase',
    icon: 'logos:supabase-icon',
    color: '',
    desc: '健康的身体是实现目标的基石。',
    group: '技术牛',
    date: '2023-04-01',
  },
  {
    title: 'Ts',
    icon: 'logos:typescript-icon',
    color: '#4476C0',
    desc: '路是走出来的，而不是空想出来的。',
    group: '架构组',
    date: '2023-04-01',
  },
]
</script>

<template>
  <BasicPage :content-background="false">
    <template #headerContent>
      <WorkplaceHeader />
    </template>
    <div class="lg:flex">
      <div class="w-full lg:w-8/12 !mr-4 enter-y">
        <ProjectCard :data="groupItems" :loading="loading" class="enter-y" />
        <DynamicInfo :data="dynamicInfoItems" :loading="loading" class="!my-4 enter-y" />
      </div>
      <div class="lg:w-4/12 w-full enter-y">
        <QuickNav :data="navItems" :loading="loading" class="enter-y" />

        <NCard class="!my-4 enter-y" :loading="loading" content-style="padding: 0">
          <img class="xl:h-50 h-30 mx-auto" src="~/assets/svg/coworking.svg">
        </NCard>
      </div>
    </div>
  </BasicPage>
</template>
