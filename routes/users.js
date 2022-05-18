const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const model = require('../models/users')
const can = require('../permissions/users')
const auth = require('../controllers/auth')

const { userValidation } = require('../controllers/validation')
const router = Router({prefix: '/api/v1/users'})

const getAll = async (ctx) => {
  const permission = can.readAllUser(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403
  } 
  try{
    const result = await model.getAll('user')
    if (result.length) {
      ctx.status = 200
      ctx.body = result
    }
  } catch (error){
    console.log(error)
  }
}

const getById = async (ctx) => {
  const id = ctx.params.id
  const permission = can.readUser(ctx.state.user, parseInt(id))
  if (!permission.granted) {
    ctx.status = 403
    return
  } 
  try {
    const result = await model.getByID(id, 'user')
    if (!result.length) {
      ctx.status = 404
      return
    }
    ctx.status = 200
    ctx.body = result[0]
  } catch (error){
    console.log(error)
    ctx.status = 400
  }
}

const createUser = async (ctx) => {
  const body = ctx.request.body
  try{
    const result = await model.createUser(body, 'user')
    ctx.status = 201
    ctx.body = result[0]
  } catch (error) {
    ctx.status = 400
    console.log(error)
  }
}

const updateUser = async (ctx) => {
  const id = ctx.params.id
  const permission = can.updateUser(ctx.state.user, parseInt(id))
  if (!permission.granted) {
    ctx.status = 403
    return
  } 
  try {
    const user = await model.getById(id, 'user')
    if (!user.length) {
      ctx.status = 404
      return
    }
    const body = ctx.request.body
    const result = await model.updateUser(id, body)
    ctx.body = result[0]
    ctx.status = 200
    return
  } catch (error) {
    console.log (error)
    ctx.status = 400
  }
}

const deleteUser = async (ctx) => {
  const id = ctx.params.id
  const permission = can.deleteUser(ctx.state.user, parseInt(id))
  if (!permission.granted) {
    ctx.status = 403
  } 
  try {
    const user = await model.getById(id, 'user')
    if(!user.lenght) {
      ctx.status = 404
      return
    }
    await model.deleteUser(id)
    ctx.status = 204
    return
  } catch (error) {
    console.log (error)
    ctx.status = 400
  }
}

const login = async (ctx) => {
  console.log('Starting to login')
  const result = { 
    id: ctx.state.user.id,
    username: ctx.state.user.username,
    password: ctx.state.user.password,
    role: ctx.state.user.role
  }
  ctx.status = 200
  ctx.body = result
  console.log ('Login Successfully')
}

router.get('/', auth, getAll)
router.get('/:id([0-9]{1,})', auth, getById)
router.post('/', bodyParser(), userValidation, createUser)
router.put('/:id([0-9]{1,})', bodyParser(), auth, userValidation, updateUser)
router.delete('/:id([0-9]{1,})', auth, deleteUser)
router.post('/login', auth, login)

module.exports = router