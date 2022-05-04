const db = require('../helpers/database')

// Get all the dogs in the database
exports.getAll = async () => {
  const query = 'SELECT * FROM dogs'
  const data = await db.run_query(query)
  return data
}

// Get a dog by id in the database 
exports.getByID = async (id) => {
  const userId = [id]
  const query = 'SELECT * FROM dogs WHERE id = ?'
  let data = await db.run_query(query, userId)
  return data
}

// Get dogs by name in the database
exports.getByName = async (name) => {
  const values = [name]
  const query = 'SELECT * FROM dogs WHERE name = ?'
  const data = await db.run_query(query, values)
  return data
}

// Create a new dog in the database
exports.createDog = async (userDetails) => {
  let keys = Object.keys(userDetails)
  keys = keys.join(',')
  const values = Object.values(userDetails)
  let parm = ''
  for (let i = 0; i < values.length; i++) parm += '?,'
  parm = parm.slice(0, -1)
  const query = `INSERT INTO dogs (${keys}) VALUES (${parm}) RETURNING *`
  const data = await db.run_query(query, values)
  return data
}

// Update the existing dog in the database
exports.updateDog = async (id, dogDetails) => {
  const dogId = [id]
  let keys = Object.keys(dogDetails)
  keys = keys.join(' = ?,')
  const values = Object.values(dogDetails)
  const query = `UPDATE dogs SET ${keys} = ? WHERE id = ${dogId} RETURNING *`
  const data = await db.run_query(query, values)
  return data
}

// Delete the dog by  in the databse
exports.deleteDog = async (id) => {
  const dogId = [id]
  const query = `Delete from users WHERE id = ${dogId}`
  try {
    await db.run_query(query)
    return { status: 200 }
  } catch (error) {
    return error
  }
}
