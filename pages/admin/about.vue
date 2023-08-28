<script lang="ts" setup>
import { NTag } from 'naive-ui'
import pkg from '~/package.json'
import { DOC_URL, GITHUB_URL, SITE_URL } from '~/constants/site'

definePageMeta({
  layout: 'admin',
  middleware: 'admin',
  title: '关于',
  order: 100,
  icon: 'simple-icons:aboutdotme',
})

const { repository, name, version, devDependencies } = pkg

const { themeColor } = useAppSetting()

const commonTagRender = (type: string) => (val: string) => h(NTag as any, { type, size: 'small' }, () => val)
const commonLinkRender = (text: string) => (href: string) => h('a', { href, target: '_blank' }, text)

const infoSchema = [
  {
    label: '版本',
    field: 'version',
    component: commonTagRender('info')(version),
  },
  {
    label: '文档地址',
    field: 'doc',
    component: commonLinkRender('文档地址')(DOC_URL),
  },
  {
    label: '预览地址',
    field: 'preview',
    component: commonLinkRender('预览地址')(SITE_URL),
  },
  {
    label: 'Github',
    field: 'github',
    component: commonLinkRender('Github')(GITHUB_URL),
  },
]

const devSchema: { label: string; value: string }[] = Object.entries(devDependencies).map(([key, value]) => ({ label: key, value }),
)
</script>

<template>
  <BasicPage title="关于" :content-background="false">
    <template #headerContent>
      <span class="text-base">
        <a :herf="repository.url" target="_blank" :style="{ color: themeColor }">
          {{ name }}
        </a>
        是一个一站式管理系统，融合 Nuxt、Naive UI 和 Supabase，帮助你快速开发全栈 Nuxt 应用。
      </span>
    </template>

    <NCard
      :bordered="false"
      title="项目信息"
      size="small"
      :segmented="{ content: true }"
    >
      <NDescriptions bordered label-placement="left" size="small" :column="2">
        <NDescriptionsItem v-for="info in infoSchema" :key="info.field" :label="info.label">
          <component :is="info.component" />
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>

    <div class="mb-4" />

    <NCard
      title="依赖信息"
      size="small"
      :segmented="{ content: true }"
    >
      <NDescriptions bordered label-placement="left" size="small" :column="3">
        <NDescriptionsItem v-for="info in devSchema" :key="info.label" :label="info.label">
          {{ info.value }}
        </NDescriptionsItem>
      </NDescriptions>
    </NCard>
  </BasicPage>
</template>

<style lang="scss" scoped>
:deep(a) {
  color: v-bind('themeColor') !important;
}
</style>
