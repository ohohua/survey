import './src/env.js'

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ['@survey/shared'],
  images: {
    domains: ['localhost'],
  },
}

export default config
