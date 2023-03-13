<script lang="ts" setup>
const app = useAppConfig()

const router = useRouter()

const navbar = ref(null)
</script>

<template>
  <div
    ref="navbar"
    class="backdrop-filter backdrop-blur-md top-0 z-40 w-full flex-none transition-colors duration-300 lg:z-50 border-b border-gray-900/10 bg-white/[0.5]"
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

<style lang="scss">
.slide-fade-from-up-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-from-up-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-from-up-enter-from,
.slide-fade-from-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

a.router-link-active {
  font-weight: bold;
}
a.router-link-exact-active {
  color: theme('colors.slate.900');
}
</style>
