// 深度合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  const result = Object.assign({}, src)
  Object.keys(target).forEach((key) => {
    if (result[key] && typeof result[key] === 'object')
      result[key] = deepMerge(result[key], target[key])

    else
      result[key] = target[key]
  })
  return result
}
