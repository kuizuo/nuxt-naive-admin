<template>
  <div>
    <AppHeader />
    <div class="max-w-2xl px-4 py-10 my-2 mx-auto bg-white sm:px-8 sm:shadow dark:bg-gray-800 sm:rounded">
      <main class="pros dark:prose-zinc max-w-none">
        <slot />
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<style lang="postcss">
.prose h2 a,
.prose h3 a {
  @apply no-underline
}

.prose h2 a:hover,
.prose h3 a:hover {
  @apply no-underline border-b border-neutral-600 dark:border-neutral-300
}
</style>
