const db = require('../helpers/database')

//get a single article by its id  
exports.getById = async function getById (id) {
  let query = "SELECT * FROM articles WHERE ID = ?"
  let values = [id]
  let data = await db.run_query(query, values)
  return data
}

//list all the articles in the database
exports.getAll = async function getAll (page, limit, order) {
  // TODO: use page, limit, order to give pagination
  let query = "SELECT * FROM articles;"
  let data = await db.run_query(query)  
  return data
}

//create a new article in the database
exports.add = async function add (article) {  
  let keys = Object.keys(article)
  let values = Object.values(article)  
  keys = keys.join(',')   
  let parm = ''
  for(i=0; i<values.length; i++){ parm +='?,'}
  parm=parm.slice(0,-1)
  let query = `INSERT INTO articles (${keys}) VALUES (${parm})`
  try{
    await db.run_query(query, values)  
    return {"status": 201}
  } catch(error) {
    return error
  }
}

exports.getAllMongo =  async function getAllMongo (page, limite, order) {
  let data = await dbMongo.run_query('articles', {})
  return data
}


exports.getByIdMongo =  async function getByIdMongo (id) {
  let data = await dbMongo.run_query('articles', {'authorID': parseInt(id)})
  return data
}


exports.addMongo =  async function addMongo (document) {
  let status = await dbMongo.run_insert('articles', document)
  return status
}
