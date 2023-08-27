<script lang="ts" setup>
import { APP_PRESET_COLOR_LIST } from '~/constants/theme'

const colorMode = useColorMode()
const { themeColor, setThemeColor } = useAppSetting()
const { menuType, setMenuType } = useMenuSetting()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val: any) => {
    colorMode.preference = val ? 'dark' : 'light'
  },
})
</script>

<template>
  <NDrawer :width="300" placement="right">
    <NDrawerContent
      title="项目配置" closable :body-content-style="{
        padding: '8px 16px',
      }"
    >
      <NDivider title-placement="center">
        主题
      </NDivider>

      <div class="flex justify-center">
        <NTooltip placement="bottom">
          <template #trigger>
            <n-switch v-model:value="isDark" size="large">
              <template #checked>
                <n-icon>
                  <Icon name="twemoji:sun" />
                </n-icon>
              </template>
              <template #unchecked>
                <n-icon>
                  <Icon name="twemoji:last-quarter-moon-face" />
                </n-icon>
              </template>
            </n-switch>
          </template>
          <span>{{ isDark ? '深' : '浅' }}色主题</span>
        </NTooltip>
      </div>

      <NDivider title-placement="center">
        系统主题
      </NDivider>

      <div class="flex justify-between gap-2">
        <span
          v-for="(item, index) in APP_PRESET_COLOR_LIST" :key="index" class="theme__item" :style="{ 'background-color': item }"
          @click="setThemeColor(item)"
        >
          <NIcon v-if="item === themeColor" size="14" color="#fff" class="!w-full !h-full !inline-flex justify-center items-center">
            <Icon name="ant-design:check-outlined" />
          </NIcon>
        </span>
      </div>

      <NDivider title-placement="center">
        导航栏风格
      </NDivider>

      <div class="flex justify-center gap-4">
        <NTooltip placement="top">
          <template #trigger>
            <div
              class="menu-type-picker__item menu-type-picker__item--light"
              :class="{ 'menu-type-picker__item--active': menuType === 'light' }"
              @click="setMenuType('light')"
            />
          </template>
          <span>亮色侧边栏</span>
        </NTooltip>

        <NTooltip placement="top">
          <template #trigger>
            <div
              class="menu-type-picker__item menu-type-picker__item--dark"
              :class="{ 'menu-type-picker__item--active': menuType === 'dark' }"
              @click="setMenuType('dark')"
            />
          </template>
          <span>暗色侧边栏</span>
        </NTooltip>
      </div>
    </NDrawerContent>
  </NDrawer>
</template>

<style lang="scss" scoped>
.theme__item {
  width: 20px;
  height: 20px;
  border: 1px solid #ddd;
  border-radius: 2px;
  cursor: pointer;
}

.menu-type-picker__item {
    position: relative;
    width: 56px;
    height: 48px;
    margin-right: 16px;
    overflow: hidden;
    border-radius: 4px;
    background-color: #f0f2f5;
    box-shadow: 0 1px 2.5px #0000002e;
    cursor: pointer;

    &:before, &:after {
    content: "";
    position: absolute;
  }

}

.menu-type-picker__item--light:before {
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    border-radius: 4px 0 0 4px;
    background-color: #fff;
}

.menu-type-picker__item--dark:after,
.menu-type-picker__item--light:after {
    top: 0;
    left: 0;
    width: 100%;
    height: 25%;
    background-color: #fff;
}

.menu-type-picker__item--dark:before {
    top: 0;
    left: 0;
    width: 33%;
    height: 100%;
    border-radius: 4px 0 0 4px;
    background-color: #273352;
    z-index: 10;
}

.menu-type-picker__item:hover, .menu-type-picker__item--active {
    padding: 12px;
    border: 2px solid #0960bd;
}
</style>
