const db = require('../helpers/database')

exports.getWorkerId = async (workerId) => {
  const valueId = [workerId]
  const query = 'SELECT * FROM workers WHERE workerid = ?'
  const data = await db.run_query(query, valueId)
  return data
}
