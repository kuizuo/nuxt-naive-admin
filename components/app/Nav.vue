<script setup lang="ts">
import { DOC_URL } from '~/constants/site'

const user = useSupabaseUser()
const { public: { adminUid } } = useRuntimeConfig()
</script>

<template>
  <nav class="flex gap-2 items-center text-left">
    <NuxtLink v-if="user?.id === adminUid" to="/admin/dashboard" class="w-full md:w-auto">
      <NButton type="primary" size="small">
        {{ $t('pages.dashboard.title') }}
      </NButton>
    </NuxtLink>

    <NuxtLink :to="DOC_URL" class="w-full md:w-auto">
      <NButton quaternary type="primary" size="small">
        {{ $t('layout.header.document') }}
      </NButton>
    </NuxtLink>
  </nav>
</template>
