const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const model = require('../models/workers.js')
const auth = require('../controllers/auth.js')
const { workerValidation } = require('../controllers/validation');
const can = require('../permissions/workers.js')


const router = Router({ prefix: '/api/v1/workers' })

const getAll = async (ctx) => {
  const permission = can.readWorkerAll(ctx.state.user)
  if (!permission.granted) return ctx.status = 403
  try {
    const result = await model.getAll('worker')
    if (result.length) {
      ctx.status = 200
      ctx.body = result
    } 
  } catch (error) {
    console.log(error)
  }
}

const getById = async (ctx) => {
  const id = ctx.params.id
  const permission = can.readWorker(ctx.state.user, parseInt(id))
  if (!permission.granted) return ctx.status = 403
  try {
    const result = await model.getByID(id, 'worker')
    if (!result.length) return ctx.status = 404
    ctx.status = 200
    ctx.body = result[0]
    console.log('Get worker successfully')
  } catch (error) {
    console.log(error)
  }
}

const createWorker = async (ctx) => {
  const body = ctx.request.body
  try {
    const result = await model.createUser(body, 'worker')
    if (!result.length) throw error
    ctx.status = 201
    ctx.body = result[0]
    console.log('Create worker successfully')
  } catch(error) {
    console.log(error)
  }
}

const updateWorker = async (ctx) => {
  const id = ctx.params.id
  const permission = can.updateWorker(ctx.state.user, parseInt(id))
  if (!permission.granted) { 
    console.log('Fail to check permission')
    return ctx.status = 403
  }
  console.log('Success to check permission')
  try{
    const worker = await model.getByID(id, 'worker')
    if (!worker.length) return ctx.status = 404
    const body = ctx.request.body
    const result = await model.updateUser(id, body)
    if (!result.length) throw error
    ctx.body = result[0]
    console.log('Update worker successfully')
    return
  } catch (error) {
    console.log(error)
  } 
}

const deleteWorkerById = async (ctx) => {
  const id = ctx.params.id
  const permission = can.deleteWorker(ctx.state.user, parseInt(id))
  if (!permission.granted) return ctx.status = 403

  try {
    const user = await model.getWorkerId(id)
    if (!user.length) return ctx.status = 404
    const result = await model.deleteWorker(id)
    if (!result) throw error
    return ctx.status = 204
  } catch (error) {
    console.log(error)
  }
}

const checkWorkerId = async (ctx, next) => {
  let workerId = ctx.request.body.workerid
  result = await model.getWorkerId(workerId)
  if(!result.length) {
    ctx.status = 403
    ctx.body = {message: `Cannot find Worker ID: ${workerId}`}
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
