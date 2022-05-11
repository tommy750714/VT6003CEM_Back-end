const Koa = require('koa')
const static = require('koa-static-router')

const app = new Koa()

const dogs = require('./routes/dogs')
const users = require('./routes/users')
const workers = require('./routes/workers')

app.use(dogs.routes())
app.use(users.routes())
app.use(workers.routes())
app.use(static({dir:'docs', router: '/doc/'}))

let port = process.env.PORT || 10888;

app.listen(port)
console.log('API is ready')
