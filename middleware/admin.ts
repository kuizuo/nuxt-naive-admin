export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()
  const { public: { adminUid } } = useRuntimeConfig()

  if (user.value.id !== adminUid)
    return navigateTo('/')
})
