import Env from './next.config.js'
const isProd = process.env.NODE_ENV === 'production'

const setting = {
  isProd,
  basePath: Env.basePath,
  apiPath: process.env.NEXT_PUBLIC_API_PATH ?? 'http://localhost:3000',
  title: '🍼 cognito-on-browser 🍼'
}

export default setting
