<script setup>

</script>

<template>
  <div>
    <div mb-6 inline-flex text-2xl font-300 cursor-default>
      <div flex flex-col children:mx-auto>
        <i i-carbon-api-1 text-green5 icon-btn w-10 h-10 />
      </div>
    </div>
    <Suspense>
      <Demo />
      <template #fallback>
        <div op50 italic>
          <span animate-pulse>Loading...</span>
        </div>
      </template>
    </Suspense>
  </div>
</template>
