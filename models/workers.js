const db = require('../helpers/database')

exports.getWorkerId = async (id) => {
  const workerId = [id]
  const query = 'SELECT * FROM workers WHERE workerid = ?'
  const data = await db.run_query(query, workerId)
  return data
}

// Get all workers in the database
exports.getWorkerAll = async () => {
  const role = ['worker']
  const query = 'SELECT * FROM users where role = ?'
  const data = await db.run_query(query, role)
  return data
}

// Get worker by ID in the database
exports.getWorkerByID = async (id) => {
  const userId = [id]
  const query = 'SELECT * FROM users WHERE id = ?'
  return await db.run_query(query, userId)
}


exports.createWorker = async (userBody) => {
  userBody.role = "worker"
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

exports.updateWorker = async (id, userBody) => {
  const workerId = [id]
  let keys = Object.keys(userBody)
  keys = keys.join(' = ?,')
  const values = Object.values(userBody)
  const query = `UPDATE users SET ${keys} = ? WHERE id = ${workerId} RETURNING *`
  const data = await db.run_query(query, values)
  return data
}


exports.deleteUser = async (id) => {
  const workerId = [id]
  const query = `Delete from users WHERE id = ${workerId}`
  try {
    await db.run_query(query)
    return { status: 200 }
  } catch (error) {
    return error
  }
}