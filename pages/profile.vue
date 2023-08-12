<script setup lang="ts">
const user = useSupabaseUser()

const { auth } = useSupabaseClient()

definePageMeta({
  auth: false,
})
</script>

<template>
  <div class="w-full max-w-5xl mx-auto  bg-white px-5 py-4">
    <div v-if="user" class="flex flex-col justify-center items-center gap-4">
      <img v-if="user?.image" class="w-12 h-12 rounded-full" :src="user.image" alt="User Avatar">
      <h1 class="text-lg">
        {{ user?.name }}
      </h1>
      <h2>
        {{ user?.email }}
      </h2>
    </div>
    <h1 v-else>
      Not logged in
    </h1>
  </div>
</template>
