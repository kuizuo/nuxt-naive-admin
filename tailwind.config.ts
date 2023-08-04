import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'
import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  theme: {},
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['ri', 'mdi', 'uil', 'ant-design']),
    }),
  ],
}
