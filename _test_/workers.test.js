const request = require('supertest')
const app = require('./app.test.js')


let id = 0

const admin = { username: "alice", password: "1234" }
const user =  { username: "bob", password: "2468" }
const worker =  { username: "yeung", password: "69420" }
const wrongLogin =  { username: "notfound", password: "notfoundpwd" }
const newUser=  { username: "newperson", password: "123123" }
const editUser=  { username: "editperson", password: "234234" }


const getExpected = {
  "id": 11,
  "firstname": "Yeung",
  "lastname": "Cheng",
  "username": "yeung1117",
  "about": "pwd:1234abCD",
  "dateregistered": "2022-05-23 10:06:21.168Z",
  "password": "$2b$10$eYHXt4Vcgif1TLanh2JsAO1Tf1SdYzuGRJLMaFF.UqGsOw.irTy16",
  "passwordsalt": null,
  "email": "yeungcheng@abc.com",
  "avatarurl": null,
  "role": "worker",
  "workerid": 123
}

const wrongPostData = {
  "email": "temp@123.com",
  "password": newUser.password,
  "firstname": "temp",
  "lastname": "123",
  "username": newUser.username,
  "workerid": 123,
  "wrongkey": 456456456456
}

const wrongWorkeridPostData = {
  "email": "temp@123.com",
  "password": newUser.password,
  "firstname": "temp",
  "lastname": "temper",
  "username": newUser.username,
  "workerid": 999
}

const postData = {
  "email": "temp@123.com",
  "password": newUser.password,
  "firstname": "temp",
  "lastname": "123",
  "username": newUser.username,
  "workerid": 123
}

const postExpected = {
  "firstname": "temp",
  "lastname": "123",
  "username": newUser.username,
  "about": null,
  "email": "temp@123.com",
  "avatarurl": null,
  "role": "worker",
  "workerid": 123
}

const wrongPutData = {
  "email": "update@123.com",
  "password": editUser.password,
  "firstname": "update",
  "lastname": "234",
  "username": editUser.username,
  "about": "update about",
  "workerid": 123,
  "wrongkey": 1384183481
}

const putData = {
  "email": "update@123.com",
  "password": editUser.password,
  "firstname": "update",
  "lastname": "234",
  "username": editUser.username,
  "about": "update about",
  "workerid": 123
}

const putExpected = {
  "firstname": "update",
  "lastname": "234",
  "username": editUser.username,
  "about": "update about",
  "email": "update@123.com",
  "avatarurl": null,
  "role": "worker",
  "workerid": 123
}

jest.setTimeout(300000)

describe('Get all workers', () => {
  it('Return all workers', async () => {
    const res = await request(app.callback())
      .get('/api/v1/workers')
      .auth(admin.username, admin.password)
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('application/json')
    expect(res.body).toContainEqual(getExpected)
  })
})

describe('Get all workers with wrong login', () => {
  it('Return status 401', async () => {
    const res = await request(app.callback())
      .get('/api/v1/workers')
      .auth(wrongLogin.username, wrongLogin.password)
      .send({})
    expect(res.statusCode).toEqual(401)
  })
})

describe('Get all workers with wrong role', () => {
  it('Return status 403', async () => {
    const res = await request(app.callback())
      .get('/api/v1/workers')
      .auth(user.username, user.password)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Get worker by id = 4', () => {
  it('Return the status 200  ', async () => {
    const res = await request(app.callback())
      .get('/api/v1/workers/4')
      .auth(worker.username, worker.password)
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('application/json')
    expect(res.body).toEqual(getExpected)
  })
})

describe('Get worker by id = 4 with wrong login', () => {
  it('Return the status 401', async () => {
    const res = await request(app.callback())
      .get('/api/v1/workers/4')
      .auth(wrongLogin.username, wrongLogin.password)
    expect(res.statusCode).toEqual(401)
  })
})

describe('Get worker by id = 4 with no permission', () => {
  it('Return the status 403', async () => {
    const res = await request(app.callback())
      .get('/api/v1/workers/4')
      .auth(user.username, user.password)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Get worker by id which is not found', () => {
  it('Return the status 404', async () => {
    const res = await request(app.callback())
      .get('/api/v1/workers/0')
      .auth(admin.username, admin.password)
      .send({})
    expect(res.statusCode).toEqual(404)
  })
})

describe('Post a new worker with wrong schema', () => {
  it('Return status 400', async () => {
    const res = await request(app.callback())
      .post('/api/v1/workers/')
      .send(wrongPostData)
    expect(res.statusCode).toEqual(400)
  })
})

describe('Post a new worker with wrong workerid', () => {
  it('Return status 403', async () => {
    const res = await request(app.callback())
      .post('/api/v1/workers/')
      .send(wrongWorkeridPostData)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Post a new worker', () => {
  it('Return the status 201', async () => {
    const res = await request(app.callback())
      .post('/api/v1/workers/')
      .send(postData)
    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual('application/json')
    expect(res.body).toMatchObject(postExpected)
    id = res.body.id
  })
})

describe('Update a worker with wrong schema', () => {
  it('Return the status 400', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/workers/${id}`)
      .auth(newUser.username, newUser.password)
      .send(wrongPutData)
    expect(res.statusCode).toEqual(400)
  })
})

describe('Update a worker with wrong login', () => {
  it('Return the status 401', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/workers/${id}`)
      .auth(wrongLogin.username, wrongLogin.password)
      .send(putData)
    expect(res.statusCode).toEqual(401)
  })
})

describe('Update a worker with no permission', () => {
  it('Return the status 403', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/workers/${id}`)
      .auth(user.username, user.password)
      .send(putData)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Update a worker which is not found', () => {
  it('Return the status 404', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/workers/0`)
      .auth(admin.username, admin.password)
      .send(putData)
    expect(res.statusCode).toEqual(404)
  })
})

describe('Update a worker', () => {
  it('Return the status 200', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/workers/${id}`)
      .auth(newUser.username, newUser.password)
      .send(putData)
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('application/json')
    expect(res.body).toMatchObject(putExpected)
  })
})

describe('Delete a worker with wrong login', () => {
  it('Return the status 401', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/workers/${id}`)
      .auth(wrongLogin.username, wrongLogin.password)
    expect(res.statusCode).toEqual(401)
  })
})

describe('Delete a worker with no permission', () => {
  it('Return the status 403', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/workers/${id}`)
      .auth(editUser.username, editUser.password)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Delete a worker which is not found', () => {
  it('Return the status 404', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/workers/0`)
      .auth(admin.username, admin.password)
    expect(res.statusCode).toEqual(404)
  })
})

describe('Delete a worker', () => {
  it('Return the  status 204', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/workers/${id}`)
      .auth(admin.username, admin.password)
    expect(res.statusCode).toEqual(204)
  })
})
