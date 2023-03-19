declare module '#app' {
  interface PageMeta {
    title?: string
    order?: number
    icon?: string
    affix?: boolean
    hideMenu?: boolean
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}
