<script lang="ts" setup>
import colors from '#tailwind-config/theme/colors'

const colorMode = useColorMode()

const settingsStore = useSettingsStore()
const { themeColor, setThemeColor } = useAppSetting()
const { menuType, setMenuType } = useMenuSetting()

const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (val: any) => {
    colorMode.preference = val ? 'dark' : 'light'
  },
})

const primaryColors = computed(() => {
  const excludeColors = ['inherit', 'current', 'transparent', 'white', 'black', 'gray', 'slate', 'cool', 'zinc', 'neutral', 'stone']

  return Object.keys(colors).filter(key => !excludeColors.includes(key)).map(color => (colors as any)[color][isDark.value ? 400 : 500])
})
</script>

<template>
  <NDrawer :width="300" placement="right">
    <NDrawerContent
      title="项目配置" closable :body-content-style="{
        padding: '4px 16px',
      }"
    >
      <NDivider title-placement="center">
        主题
      </NDivider>

      <div class="flex justify-center">
        <NTooltip placement="bottom">
          <template #trigger>
            <NSwitch v-model:value="isDark" size="large">
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
            </NSwitch>
          </template>
          <span>{{ isDark ? '深' : '浅' }}色主题</span>
        </NTooltip>
      </div>

      <NDivider title-placement="center">
        系统主题
      </NDivider>

      <div class="flex flex-wrap justify-center gap-2">
        <span
          v-for="(item, index) in primaryColors" :key="index" class="theme__item"
          :style="{ 'background-color': item }" @click="setThemeColor(item)"
        >
          <NIcon
            v-if="item === themeColor" size="14" color="#fff"
            class="!w-full !h-full !inline-flex justify-center items-center"
          >
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
              :class="{ 'menu-type-picker__item--active': menuType === 'light' }" @click="setMenuType('light')"
            />
          </template>
          <span>亮色侧边栏</span>
        </NTooltip>

        <NTooltip placement="top">
          <template #trigger>
            <div
              class="menu-type-picker__item menu-type-picker__item--dark"
              :class="{ 'menu-type-picker__item--active': menuType === 'dark' }" @click="setMenuType('dark')"
            />
          </template>
          <span>暗色侧边栏</span>
        </NTooltip>
      </div>

      <NDivider title-placement="center">
        界面功能
      </NDivider>

      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          折叠菜单
          <NSwitch v-model:value="settingsStore.menuSetting.collapsed" size="small" />
        </div>

        <div class="flex justify-between items-center">
          菜单展开宽度
          <NInputNumber v-model:value="settingsStore.menuSetting.menuWidth" size="small" :step="10" class="w-32">
            <template #suffix>
              px
            </template>
          </NInputNumber>
        </div>
      </div>

      <NDivider title-placement="center">
        界面显示
      </NDivider>

      <div class="flex flex-col gap-2">
        <div class="flex justify-between items-center">
          面包屑
          <NSwitch v-model:value="settingsStore.headerSetting.showBreadCrumb" size="small" />
        </div>

        <div class="flex justify-between items-center">
          面包屑图标
          <NSwitch v-model:value="settingsStore.headerSetting.showBreadCrumbIcon" size="small" />
        </div>

        <div class="flex justify-between items-center">
          标签页
          <NSwitch v-model:value="settingsStore.headerSetting.showTabs" size="small" />
        </div>

        <div class="flex justify-between items-center">
          Logo
          <NSwitch v-model:value="settingsStore.appSetting.showLogo" size="small" />
        </div>
      </div>

      <NDivider title-placement="center" />

      <div class="flex flex-col gap-2">
        <NAlert type="warning">
          该功能主要实时预览各种布局效果，更多完整配置在 constants/theme.ts 中设置。
        </NAlert>
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

  &:before,
  &:after {
    content: "";
    position: absolute;
  }

}

.menu-type-picker__item--light:before {
  top: 0;
  left: 0;
  width: 33%;
  height: 100%;
  border-radius: 2px 0 0 2px;
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
  border-radius: 2px 0 0 2px;
  background-color: #273352;
  z-index: 10;
}

.menu-type-picker__item:hover,
.menu-type-picker__item--active {
  padding: 12px;
  border: 2px solid #0960bd;
}
</style>
