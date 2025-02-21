import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  type: 'app',
  typescript: true,
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  ignores: [
    '**/fixtures',
  ],
}, {
  rules: {
    'node/prefer-global/process': 'off',
  },
})
