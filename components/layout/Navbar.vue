<script lang="ts" setup>
const app = useAppConfig()

const router = useRouter()

const navbar = ref(null)
</script>

<template>
  <div
    ref="navbar"
    class="backdrop-filter backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-900/10"
  >
    <div id="navbar-banner" class="banner">
      <slot name="banner" />
    </div>
    <div class="max-w-8xl w-full mx-auto">
      <div class="py-1 lg:px-8 mx-4 lg:mx-0">
        <div class="relative flex items-center">
          <!-- title -->
          <slot name="title">
            <AppLogo />
          </slot>
          <div flex="auto" />

          <!-- 个人中心 -->
          <div class="flex gap-4">
            <AppDarkToggle />
            <UserDropdown />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

