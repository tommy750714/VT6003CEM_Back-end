const Koa = require('koa')
const static = require('koa-static-router')

const app = new Koa()

const special = require('./routes/special')
const articles = require('./routes/articles')
const user = require('./routes/users')

app.use(special.routes())
app.use(articles.routes())
app.use(user.routes())
app.use(static({dir:'docs', router: '/doc/'}))

let port = process.env.PORT || 10888;

app.listen(port)
console.log('API is ready')
