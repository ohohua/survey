const Koa = require('koa')
const Router = require('koa-router')
const mockList = require('./router/index')

const app = new Koa()
const router = new Router()

async function delay(fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn())
    }, 1000)
  })
}

mockList.forEach((item) => {
  const { url, methods, response } = item
  router[methods](url, async (ctx) => {
    const data = await delay(response)
    ctx.body = data
  })
})

app.use(router.routes())
app.listen(3001)
