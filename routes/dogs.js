const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const model = require('../models/dogs')
const auth = require('../controllers/auth')
const can = require('../permissions/dogs')
const { dogValidation } = require('../controllers/validation');

const router = Router({prefix: '/api/v1/dogs'})

const getAll = async (ctx) => {
  try{
    const result = await model.getAll()
    if (result.length) {
      ctx.status = 200
      ctx.body = result
    }
  } catch (error) {
    console.log(error)
    ctx.status = 400
  }
}

const getById = async (ctx) => {
  const id = ctx.params.id
  try{
    const result = await model.getByID(id)
    if (!result.length) {
      ctx.status = 404
      return
    }
    ctx.status = 200
    ctx.body = result[0]  
    } catch (error) {
      console.log(error)
      ctx.status = 400
    }
}

const createDog = async (ctx) => {
  const permission = can.createDog(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403
    return
  } 
  try {
      const body = ctx.request.body
      const result = await model.createDog(body)
      ctx.status = 201
      ctx.body = result[0]
  } catch (error){
    console.log(error)
    ctx.status = 400
  }
}

const updateDog = async (ctx) => {
  const id = ctx.params.id
  const permission = can.updateDog(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403
    return
  } 
  try {
    const body = ctx.request.body
    const result = await model.updateDog(id, body)
    ctx.status = 200
    ctx.body = result[0]
    } catch (error) {
    console.log(error)
    ctx.status = 400
    }
  }

const deleteDog = async (ctx) => {
  const permission = can.deleteDog(ctx.state.user)
  if (!permission.granted) {
    ctx.status = 403
    return
  } 
  try {
    const id = ctx.params.id
    const dogID = await model.getByID(id)
    if (!dogID.length) {
      ctx.status = 404
      return
    }
    const result = await model.deleteDog(id)
    console.log(result)
    ctx.status = 204
  } catch (error) {
    console.log(error)
    ctx.status = 400
  }
}


router.get('/', getAll)
router.get('/:id([0-9]{1,})', getById)
router.post('/', bodyParser(), auth, dogValidation, createDog)
router.put('/:id([0-9]{1,})', bodyParser(), auth, dogValidation, updateDog)
router.delete('/:id([0-9]{1,})', auth, deleteDog)

module.exports = router