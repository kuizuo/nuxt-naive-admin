declare module '#app' {
  interface PageMeta {
    title?: string
    order?: number
    icon?: string
    affix?: boolean
    hideMenu?: boolean
  }
}

declare namespace API {
  interface Result<T = any> {
    code: number
    message: string
    data: T
  }
}