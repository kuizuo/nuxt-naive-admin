import { breakpointsTailwind } from '@vueuse/core'

export function useDevice() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const { setMenuSetting } = useMenuSetting()

  const sm = breakpoints.smaller('sm')
  const isMobile = ref<boolean>(sm.value)

  watch(sm, (val: boolean) => {
    isMobile.value = val

    setMenuSetting({
      collapsed: val,
    })
  })

  return {
    isMobile,
  }
}
