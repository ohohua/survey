module.exports = {
  'pre-commit': 'pnpm exec lint-staged',
  'pre-push': 'pnpm exec run lint',
}
