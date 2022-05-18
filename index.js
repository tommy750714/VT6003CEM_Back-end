const Koa = require('koa')
const cors = require('@koa/cors')
const static = require('koa-static-router')
const apidoc = require('./routes/apidoc')
const users = require('./routes/users')
const workers = require('./routes/workers')
const dogs = require('./routes/dogs')

const app = new Koa()

let port = process.env.Port || 10888
app.listen(port, () => {
  console.log('API is ready')
  console.log(`Server started in port ${port}`)
})

const options = {
  origins: '*'
}
app.use(cors(options))

app.use(apidoc.routes())
app.use(users.routes())
app.use(workers.routes())
app.use(dogs.routes())
app.use(static({dir:'docs', router:'/doc/'})) 


