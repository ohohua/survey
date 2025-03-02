import { init } from '@paralleldrive/cuid2'

export const createId = init({
  random: Math.random,
  length: 10,
  fingerprint: 'ohohua', // 主机环境的自定义指纹。这有助于在分布式系统中生成id时防止冲突。
})

export * from './user'
