import { cloneDeep } from 'lodash-es'

export interface SearchResult {
  name: string
  path: string
  icon?: string
}

// interface ChangeEvent extends Event {
//   target: HTMLInputElement
// }

// Translate special characters
function transform(c: string) {
  const code: string[] = [
    '$',
    '(',
    ')',
    '*',
    '+',
    '.',
    '[',
    ']',
    '?',
    '\\',
    '^',
    '{',
    '}',
    '|',
  ]
  return code.includes(c) ? `\\${c}` : c
}

function createSearchReg(key: string) {
  const keys = [...key].map(item => transform(item))
  const str = ['', ...keys, ''].join('.*')
  return new RegExp(str)
}

export function useMenuSearch(emit: any) {
  const router = useRouter()
  const { routeList: menus } = useAuth()
  const searchResult = ref<SearchResult[]>([])
  const keyword = ref('')
  const activeIndex = ref(-1)

  let menuList: Array<any> = []

  const handleSearch = useDebounceFn(search, 200)

  onMounted(async () => {
    const list = menus.value

    menuList = cloneDeep(list)

    // forEachTree(menuList, (item) => {
    //   item.label = t(item.label)
    // })
  })

  function search(e: string) {
    const key = e
    keyword.value = key.trim()
    if (!key) {
      searchResult.value = []
      return
    }
    const reg = createSearchReg(unref(keyword))
    const filterMenu = filterTree(menuList, (item) => {
      return reg.test(item.label) && !item.hideMenu
    })

    searchResult.value = handlerSearchResult(filterMenu, reg)
    activeIndex.value = 0
  }

  function handlerSearchResult(filterMenu: any[], reg: RegExp, parent?: any) {
    const ret: SearchResult[] = []
    filterMenu.forEach((item) => {
      const { name, label, key, path, icon, children, hideMenu, meta } = item
      if (
        !hideMenu
        && reg.test(label)
        && (!children?.length)
      ) {
        ret.push({
          name: parent?.label ? `${parent.label} > ${label}` : label,
          path: key,
          icon,
        })
      }
      if (
        Array.isArray(children)
        && children.length
      )
        ret.push(...handlerSearchResult(children, reg, item))
    })
    return ret
  }

  // Activate when the mouse moves to a certain line
  function handleMouseenter(e: any) {
    const index = e.target.dataset.index
    activeIndex.value = Number(index)
  }

  // Arrow key up
  function handleUp() {
    if (!searchResult.value.length)
      return
    activeIndex.value--
    if (activeIndex.value < 0)
      activeIndex.value = searchResult.value.length - 1

    handleScroll()
  }

  // Arrow key down
  function handleDown() {
    if (!searchResult.value.length)
      return
    activeIndex.value++
    if (activeIndex.value > searchResult.value.length - 1)
      activeIndex.value = 0
  }

  // enter keyboard event
  async function handleEnter() {
    if (!searchResult.value.length)
      return

    const result = unref(searchResult)
    const index = unref(activeIndex)
    if (result.length === 0 || index < 0)
      return

    const to = result[index]
    handleClose()
    await nextTick()
    router.push(to.path)
  }

  // close search modal
  function handleClose() {
    searchResult.value = []
    emit('close')
  }

  // enter search
  onKeyStroke('Enter', handleEnter)
  // Monitor keyboard arrow keys
  onKeyStroke('ArrowUp', handleUp)
  onKeyStroke('ArrowDown', handleDown)
  // esc close
  onKeyStroke('Escape', handleClose)

  return {
    handleSearch,
    searchResult,
    keyword,
    activeIndex,
    handleMouseenter,
    handleEnter,
  }
}
