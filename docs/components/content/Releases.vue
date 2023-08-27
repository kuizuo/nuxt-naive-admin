<template>
  <div style="margin-top: 50px">
    <div v-for="release of releases" :key="release.name" style="margin-bottom: 50px">
      <ProseH2 :id="release.name">
        {{ release.name }}
        <Badge style="margin-left: 10px;">
          {{ formatDateByLocale(release.date) }}
        </Badge>
      </ProseH2>

      <ContentRenderer :value="release" />
    </div>
  </div>
</template>

<script setup lang="ts">
 const formatDateByLocale = (d: string | number | Date, options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }) => {
  return new Date(d).toLocaleDateString('en', options)
}

const { fetchReleases } = useGithub()
const { data: releases } = await useAsyncData('releases', () => fetchReleases({}))
</script>