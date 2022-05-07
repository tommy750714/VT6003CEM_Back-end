const db = require('../helpers/database')



// Get all the users in the database
exports.getAll = async function getAll () {
  const query = "select * FROM users;"
  const data = await db.run_query(query)  
  return data
}

// Get a user by id in the database
exports.getByID = async (id) => {
  const userId = [id]
  const query = 'SELECT * FROM users WHERE id = ?'
  const data = await db.run_query(query, userId)
  return data
}

// Get a user by name in the database
exports.findByUsername = async function getByUsername(username) {
  const query = 'select * from users where username = ?'
  const user = await db.run_query(query, [username])
  return user
}

// Create User
exports.createUser = async (userBody) => {
  let keys = Object.keys(userBody)
  keys = keys.join(',')
  const values = Object.values(userBody)
  let parm = ''
  for (let i = 0; i < values.length; i++) parm += '?,'
  parm = parm.slice(0, -1)
  const query = `INSERT INTO users (${keys}) VALUES (${parm}) RETURNING *`
  const data = await db.run_query(query, values)
  return data
}

// Update User
exports.updateUser = async (id, userBody) => {
  const userId = [id]
  let keys = Object.keys(userBody)
  keys = keys.join(' = ?,')
  const values = Object.values(userBody)
  const query = `UPDATE users SET ${keys} = ? WHERE id = ${userId} RETURNING *`
  const data = await db.run_query(query, values)
  return data
}

// Delete User
exports.deleteUser = async (id) => {
  const userId = [id]
  const query = `Delete from users WHERE id = ${userId}`
  try {
    await db.run_query(query)
    return { status: 201 }
  } catch (error) {
    return error
  }
}

// 
exports.login = async(body) => {
  const username = body.username
  const password = body.password
  const query = `SELECT username AND role FROM users WHERE username = '${username}' AND password = '${password}'`
  return await db.run_query(query)
}
