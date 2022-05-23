const request = require('supertest')
const app = require('./app.test.js')

let id = 0

const admin = { username: "alice", password: "1234" }
const user =  { username: "bob", password: "2468" }
const anotherUser = { username: "colin", password: "abcd" }
const wrongLogin =  { username: "notfound", password: "notfoundpwd" }
const newUser=  { username: "newperson", password: "123123" }
const editUser=  { username: "editperson", password: "234234" }


const getExpected = {
  "id": 10,
  "firstname": "Bob",
  "lastname": "Li",
  "username": "bobli",
  "about": "1234abCD",
  "dateregistered": "2022-05-23 09:38:02.736Z",
  "password": "$2b$10$ZkxlZcgHxpckT1iOkJSRQOqnZwLsWw5ej0aIlDludK8JXLVVBncYi",
  "passwordsalt": null,
  "email": "bobli@123.com",
  "avatarurl": null,
  "role": "user",
  "workerid": null
}

const wrongPostData = {
  "email": "temp@123.com",
  "password": newUser.password,
  "firstname": "temp",
  "lastname": "123",
  "username": newUser.username,
  "wrongkey": 456456456456
}


const postData = {
  "email": "temp@123.com",
  "password": newUser.password,
  "firstname": "temp",
  "lastname": "123",
  "username": newUser.username
}

const postExpected = {
  "firstname": "test",
  "lastname": "123",
  "username": newUser.username,
  "about": null,
  "email": "temp@123.com",
  "avatarurl": null,
  "role": "user",
  "workerid": null
}

const wrongPutData = {
  "email": "update@123.com",
  "password": editUser.password,
  "firstname": "update",
  "lastname": "234",
  "username": editUser.username,
  "about": "update about",
  "wrongkey": 78976541
}

const putData = {
  "email": "update@123.com",
  "password": editUser.password,
  "firstname": "update",
  "lastname": "234",
  "username": editUser.username,
  "about": "update about"
}

const putExpected = {
  "firstname": "update",
  "lastname": "234",
  "username": editUser.username,
  "about": "update about",
  "email": "update@123.com",
  "avatarurl": null,
  "role": "user",
  "workerid": null
}

jest.setTimeout(300000)

describe('Get all users', () => {
  it('Return all users', async () => {
    const res = await request(app.callback())
      .get('/api/v1/users')
      .auth(admin.username, admin.password)
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('application/json')
    expect(res.body).toContainEqual(getExpected)
  })
})

describe('Get all users with wrong login', () => {
  it('Return status 401', async () => {
    const res = await request(app.callback())
      .get('/api/v1/users')
      .auth(wrongLogin.username, wrongLogin.password)
    expect(res.statusCode).toEqual(401)
  })
})

describe('Get all users with wrong role', () => {
  it('Return the status 403', async () => {
    const res = await request(app.callback())
      .get('/api/v1/users')
      .auth(user.username, user.password)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Get user by id = 2', () => {
  it('Return the user with id = 2 information ', async () => {
    const res = await request(app.callback())
      .get('/api/v1/users/2')
      .auth(user.username, user.password)
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('application/json')
    expect(res.body).toEqual(getExpected)
  })
})

describe('Get user id 2 with wrong login', () => {
  it('Return the status 401', async () => {
    const res = await request(app.callback())
      .get('/api/v1/users/2')
      .auth(wrongLogin.username, wrongLogin.password)
    expect(res.statusCode).toEqual(401)
  })
})

describe('Get user id 4 with no permission', () => {
  it('Return status 403', async () => {
    const res = await request(app.callback())
      .get('/api/v1/users/2')
      .auth(anotherUser.username, anotherUser.password)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Get user id which is not found', () => {
  it('Return status 404', async () => {
    const res = await request(app.callback())
      .get('/api/v1/users/0')
      .auth(admin.username, admin.password)
    expect(res.statusCode).toEqual(404)
  })
})

describe('Post a new user with wrong schema', () => {
  it('Return the status 400', async () => {
    const res = await request(app.callback())
      .post('/api/v1/users/')
      .send(wrongPostData)
    expect(res.statusCode).toEqual(400)
  })
})

describe('Post a new user', () => {
  it('Return the status 201', async () => {
    const res = await request(app.callback())
      .post('/api/v1/users/')
      .send(postData)
    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual('application/json')
    expect(res.body).toMatchObject(postExpected)
    id = res.body.id
  })
})

describe('Update a user with wrong schema', () => {
  it('Return the status 400', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/users/${id}`)
      .auth(newUser.username, newUser.password)
      .send(wrongPutData)
    expect(res.statusCode).toEqual(400)
  })
})

describe('Update a user with wrong login', () => {
  it('Return the status 401', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/users/${id}`)
      .auth(wrongLogin.username, wrongLogin.password)
      .send(putData)
    expect(res.statusCode).toEqual(401)
  })
})

describe('Update a user with no permission', () => {
  it('Return the status 403', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/users/${id}`)
      .auth(user.username, user.password)
      .send(putData)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Update a user which is not found', () => {
  it('Return status 404', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/user/0`)
      .auth(admin.username, admin.password)
      .send(putData)
    expect(res.statusCode).toEqual(404)
  })
})

describe('Update a user', () => {
  it('Return the status 200', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/users/${id}`)
      .auth(newUser.username, newUser.password)
      .send(putData)
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('application/json')
    expect(res.body).toMatchObject(putExpected)
  })
})

describe('Delete a user with the wrong login', () => {
  it('Return status 401', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/users/${id}`)
      .auth(wrongLogin.username, wrongLogin.password)
    expect(res.statusCode).toEqual(401)
  })
})

describe('Delete a worker that is no permission', () => {
  it('Return the status 403', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/users/${id}`)
      .auth(editUser.username, editUser.password)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Delete a user which is not found', () => {
  it('Return the status 404', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/users/0`)
      .auth(admin.username, admin.password)
    expect(res.statusCode).toEqual(404)
  })
})

describe('Delete a user', () => {
  it('Return the status 204', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/users/${id}`)
      .auth(admin.username, admin.password)
    expect(res.statusCode).toEqual(204)
  })
})