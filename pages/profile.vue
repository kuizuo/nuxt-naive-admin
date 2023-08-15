<script setup lang="ts">
const user = useSupabaseUser()
</script>

<template>
  <div class="w-full max-w-5xl mx-auto px-5 py-4">
    <div class="flex flex-col justify-center items-center gap-4">
      <img v-if="user?.image" class="w-12 h-12 rounded-full" :src="user.image" alt="User Avatar">
      <h1 class="text-lg">
        {{ user?.user_metadata?.full_name }}
      </h1>
      <h2>
        email: {{ user?.email }}
      </h2>
    </div>
  </div>
</template>
