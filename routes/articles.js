const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const model = require('../models/articles')
const {validateArticle} = require('../controllers/validation')

const router = Router({prefix: '/api/v1/articles'})

router.get('/', getAll)
router.post('/', bodyParser(), validateArticle, createArticle)
router.get('/:id([0-9]{1,})', getById)
router.put('/:id([0-9]{1,})', updateArticle)
router.del('/:id([0-9]{1,})', deleteArticle)


async function getAll(ctx, next){  
  let articles = await model.getAll()
  if (articles.length) {
    ctx.body = articles
  }
}  

async function getById(ctx) {
  let id = ctx.params.id
  let article = await model.getById(id)
  if (article.length) {
    ctx.body = article[0]
  }
}

async function createArticle(ctx) {
  const body = ctx.request.body
  let result = await model.add(body)
  if (result) {
    ctx.status = 201
    ctx.body = result
  } else {
    ctx.status=201
    ctx.body = "{}"
  }
}

async function updateArticle(ctx) {
  // TODO edit an existing article
}

async function deleteArticle(ctx) {
  // TODO delete an existing article
}

module.exports = router;
