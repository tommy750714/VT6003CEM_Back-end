const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const model = require('../models/users')
const workerModel = require('../models/workers')
const auth = require('../controllers/auth')
const { workerValidation } = require('../controllers/validation')
const can = require('../permissions/workers')


const router = Router({ prefix: '/api/v1/workers' })

const getAll = async (ctx) => {
  const permission = can.readAllWorker(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403
    return 
  }
  try {
    const result = await model.getAll('worker')
    if (result.length) {
      ctx.status = 200
      ctx.body = result
    } 
  } catch (error) {
    ctx.status = 400
    console.log(error)
  }
}

const getById = async (ctx) => {
  const id = ctx.params.id
  const permission = can.readWorker(ctx.state.user, parseInt(id))
  if (!permission.granted){
    ctx.status = 403
    return 
  }  
  try {
    const result = await model.getByID(id, 'worker')
    if (!result.length) {
      ctx.status = 404
      return
    }
    ctx.status = 200
    ctx.body = result[0]
  } catch (error) {
    ctx.status = 400
    console.log(error)
  }
}

const createWorker = async (ctx) => {
  const body = ctx.request.body
  try {
    const result = await model.createUser(body, 'worker')
    ctx.status = 201
    ctx.body = result[0]
  } catch(error) {
    console.log(error)
    ctx.status = 400
  }
}

const updateWorker = async (ctx) => {
  const id = ctx.params.id
  const permission = can.updateWorker(ctx.state.user, parseInt(id))
  if (!permission.granted) { 
    ctx.status = 403
    return 
  }
  try{
    const worker = await model.getByID(id, 'worker')
    if (!worker.length) {
      ctx.status = 404
      return
    }
    const body = ctx.request.body
    const result = await model.updateUser(id, body)
    ctx.body = result[0]
    ctx.status = 200
    return
  } catch (error) {
    console.log(error)
    ctx.status = 400
  } 
}

const deleteWorkerById = async (ctx) => {
  const id = ctx.params.id
  const permission = can.deleteWorker(ctx.state.user, parseInt(id))
  if (!permission.granted) {
    ctx.status = 403
    return
  } 
  try {
    const user = await model.getId(id, 'worker')
    if (!user.length) {
      ctx.status = 404
      return 
    }
    await model.deleteUser(id)
    ctx.status = 204
    return
  } catch (error) {
    console.log(error)
    ctx.status = 400
  }
}

const checkWorkerId = async (ctx, next) => {
  const workerId = ctx.request.body.workerid
  const result = await workerModel.getWorkerId(workerId)
  if (!result.length) {
    console.log(result)
    ctx.status = 403
    ctx.body = { message: `Cannot find Worker ID: ${workerId}` }
    return
  } else {
    await next()
  }
}

router.get('/', auth, getAll)
router.get('/:id([0-9]{1,})', auth, getById)
router.post('/', bodyParser(), checkWorkerId, workerValidation, createWorker)
router.put('/:id([0-9]{1,})', bodyParser(), auth, workerValidation, updateWorker)
router.delete('/:id([0-9]{1,})', auth, deleteWorkerById)

module.exports = router
