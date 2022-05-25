import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  preflight: false,
  extract: {
    include: ['index.html', 'src/*.{vue,html}'],
    exclude: ['node_modules', '.git', 'dist'],
  },
})