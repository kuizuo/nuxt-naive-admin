import type { MenuOption } from 'naive-ui'
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'

interface MenuRoute {
  key: string
  label?: string
  name?: RouteRecordName
  icon?: string
  children?: MenuRoute[]
}

function getKey(path: string, parentPath: string) {
  return path.startsWith('http') ? path : `${parentPath}${parentPath ? '/' : ''}${path}`
}

export function buildMenuList(routes: Readonly<RouteRecordRaw[]>, parentPath = ''): MenuOption[] {
  const i18n = useNuxtApp().$i18n

  const menuList: MenuOption[] = []

  routes
    .filter(route => route.meta?.layout === 'admin')
    .filter(route => !route.meta?.hideMenu)
    .sort((a, b) => a.meta!.order as number - (b.meta!.order as number))
    .forEach((route) => {
      const { meta, path, children, name } = route
      const { title, icon } = meta!

      const menu: MenuOption = {
        label: i18n.t(title),
        key: getKey(path, parentPath),
        name,
        path,
        icon: renderIcon(icon as string),
      }

      if (children && children.length > 0)
        menu.children = buildMenuList(children, menu.key as string)

      menuList.push(menu)
    })

  return menuList
}

export function buildRouteList(routes: Readonly<RouteRecordRaw[]>, parentPath = '') {
  const i18n = useNuxtApp().$i18n

  const routeList: MenuRoute[] = []

  routes
    .filter(route => route.meta?.layout === 'admin')
    .filter(route => !route.meta?.hideMenu)
    .sort((a, b) => a.meta!.order as number - (b.meta!.order as number))
    .forEach((route) => {
      const { meta, path, children, name } = route
      const { title, icon } = meta!

      const menu: MenuRoute = {
        label: i18n.t(title),
        key: getKey(path, parentPath),
        name,
        path,
        icon,
      }

      if (children && children.length > 0)
        menu.children = buildRouteList(children, menu.key as string)

      routeList.push(menu)
    })

  return routeList
}

export function useAuth() {
  const router = useRouter()

  // useState 所存放值不能是不可序列化的，如 renderIcon
  const routeList = useState('routeList', () => buildRouteList(router.options.routes))

  return {
    routeList,
    // TODO: premissionList
  }
}
