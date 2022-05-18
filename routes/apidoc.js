const Router = require('koa-router')

const router = Router({prefix: '/'})

router.get('/', async ctx => ctx.body = '<p><a href="https://vt6003cemback-end.chengka.repl.co/doc/dogsapi.html">API Document</a></p>')

module.exports = router