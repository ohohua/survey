import antfu from '@antfu/eslint-config'

export default antfu({
  react: true,
  type: 'app',
  typescript: true,
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
}, {
  files: ['apps/**/src/**/*.{ts,tsx}', 'packages/**/src/*.{ts,js}'],
  rules: {
    'node/prefer-global/process': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'react-dom/no-dangerously-set-innerhtml': 'off',
  },
}, {
  files: ['apps/server/src/**/*.ts'],
  rules: {
    'ts/consistent-type-imports': 'off',
    'node/prefer-global/process': 'off',
  },
})
