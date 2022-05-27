const { defineConfig } = require('windicss/helpers')

module.exports = defineConfig({
  preflight: false,
  extract: {
    include: ['index.html', 'src/**/*.{vue,html}'],
    exclude: ['node_modules', '.git', 'dist'],
  },
})
