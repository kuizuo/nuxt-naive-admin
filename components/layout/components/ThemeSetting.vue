<script lang="ts" setup>
const show = ref(false)

function toggle() {
  show.value = !show.value
}
</script>

<template>
  <div>
    <NTooltip class="flex justify-center items-center" placement="bottom" trigger="click">
      <template #trigger>
        <span class="flex cursor-pointer" @click="toggle">
          <Icon name="ant-design:setting-outlined" />
        </span>
      </template>
      <span>{{ '设置' }}</span>
    </NTooltip>
    <SettingDrawer v-model:show="show" />
  </div>
</template>
