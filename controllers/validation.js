const {Validator, ValidationError} = require('jsonschema')
const dogSchema = require('../schemas/dogs.schema.js')
const workerSchema = require('../schemas/workers.schema.js')
const userSchema = require('../schemas/users.schema.js')

const v = new Validator()


exports.dogValidation = async (ctx, next) => {
  console.log('Start the dog schema validation')
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body
  try {
    v.validate(body, dogSchema, validationOptions)
    console.log('Validate dog schema successfully')
    await next()
  } catch(error) {
    if(error instanceof ValidationError) {
      ctx.body = error
      ctx.status = 400
      console.log('Fail to validate dog schema')
    } else {
      throw error
    }
  }
}

exports.workerValidation = async (ctx, next) => {
  console.log('Start the worker schema validation')
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body
  try {
    v.validate(body, workerSchema, validationOptions)
    console.log('Validate worker schema successfully')
    await next()
  } catch(error) {
    if(error instanceof ValidationError) {
      ctx.body = error
      ctx.status = 400
      console.log('Fail to validate worker schema')
    } else {
      throw error
    }
  }
}

exports.userValidation = async (ctx, next) => {
  console.log('Start the user schema validation')
  const validationOptions = {
    throwError: true,
    allowUnknownAttributes: false
  }
  const body = ctx.request.body
  try {
    v.validate(body, userSchema, validationOptions)
    console.log('Validate user schema successfully')
    await next()
  } catch(error) {
    if(error instanceof ValidationError) {
      ctx.body = error
      ctx.status = 400
      console.log('Fail to validate user schema')
    } else {
      throw error
    }
  }
}

