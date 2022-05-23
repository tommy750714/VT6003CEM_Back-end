const db = require('../helpers/database')
const bcrypt = require('bcrypt')
const { saltRounds } = require('../config.js')



// Get all the users in the database
exports.getAll = async (role) => {
  const value = [role]
  const query = 'select * FROM users WHERE role = ?'
  const data = await db.run_query(query, value)  
  return data
}

// Get a user by id in the database
exports.getByID = async (id, role) => {
  const query = `SELECT * FROM users WHERE id = ${id} AND role = '${role}'`
  const data = await db.run_query(query)
  return data
}


// Get a user by username in the database
exports.findByUsername = async (username) => {
  const value = [username]
  const query = 'select * from users where username = ?'
  const data = await db.run_query(query, value)
  return data
}

// Create User
exports.createUser = async (body, role) => {
  body.role = role
  body.password = await bcrypt.hash(body.password, saltRounds)
  let keys = Object.keys(body)
  keys = keys.join(',')
  const values = Object.values(body)
  let parm = ''
  for (let i = 0; i < values.length; i++) parm += '?,'
  parm = parm.slice(0, -1)
  const query = `INSERT INTO users (${keys}) VALUES (${parm}) RETURNING *`
  const data = await db.run_query(query, values)
  return data
}

// Update User
exports.updateUser = async (id, body) => {
  const userId = [id]
  body.password = await bcrypt.hash(body.password, saltRounds)
  let keys = Object.keys(body)
  keys = keys.join(' = ?,')
  const values = Object.values(body)
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
