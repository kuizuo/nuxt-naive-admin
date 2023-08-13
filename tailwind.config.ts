import { getIconCollections, iconsPlugin } from '@egoist/tailwindcss-icons'
import Typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

export default <Partial<Config>> {
  darkMode: 'class',
  theme: {},
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['ri', 'mdi', 'uil', 'ant-design']),
    }),
    Typography,
  ],
}
