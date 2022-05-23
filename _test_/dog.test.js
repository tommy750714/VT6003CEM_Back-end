const request = require('supertest')
const app = require('./app.test.js')

let id = 0

const user =  { username: "bob", password: "2468" }
const worker =  { username: "yeung", password: "69420" }
const wrongLogin =  { username: "notfound", password: "notfoundpwd" }


const getExpected = {
  id: 1,
  name: 'Happy',
  description: 'Happy',
  birthday: '2018-01-07',
  datecreated: '2022-05-23 02:46:00.429Z',
  datemodified: '2022-05-23 02:46:00.429Z',
  imageurl: null,
  published: null,
  authorid: null,
  breed: 'Happy'
}

const postData = {
  name: 'Mac Mac',
  description: 'Mac Mac Mac',
  birthday: '2019-06-09',
  breed: 'Poodle',
  published: false
}

const wrongPostData = {
  name: 'MacMac',
  description: 'Mac Mac Mac',
  birthday: '2019-06-09',
  breed: 999
}

const postExpected = {
  name: 'Mac Mac',
  description: 'Mac Mac Mac',
  birthday: '2019-06-09',
  imageurl: null,
  published: false,
  authorid: null,
  breed: 'Poodle'
}

const putData = {
  name: 'Hei Hei',
  description: 'Hei Hei Hei Hei',
  birthday: '2019-06-01',
  breed: 'breed'
}

const wrongPutData = {
  name: 'Hei Hei',
  description: 'Hei Hei Hei Hei',
  birthday: null,
  breed: 'breed'
}

const putExpected = {
  name: 'Hei Hei',
  description: 'Hei Hei Hei Hei',
  birthday: '2019-06-01',
  imageurl: null,
  published: false,
  authorid: null,
  breed: 'breed'
}

jest.setTimeout(300000)

describe('Get all dogs', () => {
  it('Return all dogs', async () => {
    const res = await request(app.callback())
      .get('/api/v1/dogs')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('application/json')
    expect(res.body).toContainEqual(getExpected)
  })
})

describe('Get the dog information by id = 1', () => {
  it('Return dog by id = 1', async () => {
    const res = await request(app.callback())
      .get('/api/v1/dogs/1')
      .send({})
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('application/json')
    expect(res.body).toEqual(getExpected)
  })
})

describe('Get the dog information by id = 0 ', () => {
  it('Return the status 404 not found', async () => {
    const res = await request(app.callback())
      .get('/api/v1/dogs/0')
      .send({})
    expect(res.statusCode).toEqual(404)
  })
})

describe('Post a new dog id with wrong syntax', () => {
  it('Return status 400', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dogs/')
      .auth(worker.username, worker.password)
      .send(wrongPostData)
    expect(res.statusCode).toEqual(400)
  })
})

describe('Post a new dog id with wrong password', () => {
  it('Return status 401', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dogs/')
      .auth(wrongLogin.username, wrongLogin.password)
      .send(postData)
    expect(res.statusCode).toEqual(401)
  })
})

describe('Post a new dog id with no permission', () => {
  it('Return status 403', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dogs/')
      .auth(user.username, user.password)
      .send(postData)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Post a new dog id', () => {
  it('Return new dog information', async () => {
    const res = await request(app.callback())
      .post('/api/v1/dogs/')
      .auth(worker.username, worker.password)
      .send(postData)
    expect(res.statusCode).toEqual(201)
    expect(res.type).toEqual('application/json')
    expect(res.body).toMatchObject(postExpected)
    id = res.body.id
  })
})

describe('Update a new dog with wrong syntax', () => {
  it('Return the status 400', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/dogs/${id}`)
      .auth(worker.username, worker.password)
      .send(wrongPutData)
    expect(res.statusCode).toEqual(400)
  })
})

describe('Update a dog with wrong password', () => {
  it('Return the status 401', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/dogs/${id}`)
      .auth(wrongLogin.username, wrongLogin.password)
      .send(postData)
    expect(res.statusCode).toEqual(401)
  })
})

describe('Update a dog with no permission', () => {
  it('Return status 403', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/dogs/${id}`)
      .auth(user.username, user.password)
      .send(postData)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Update a dog', () => {
  it('Return the status 200', async () => {
    const res = await request(app.callback())
      .put(`/api/v1/dogs/${id}`)
      .auth(worker.username, worker.password)
      .send(putData)
    expect(res.statusCode).toEqual(200)
    expect(res.type).toEqual('application/json')
    expect(res.body).toMatchObject(putExpected)
  })
})

describe('Delete a dog with the wrong password', () => {
  it('Return the status 401', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/dogs/${id}`)
      .auth(wrongLogin.username, wrongLogin.password)
    expect(res.statusCode).toEqual(401)
  })
})

describe('Delete a dog with no permission', () => {
  it('Return the status 403', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/dogs/${id}`)
      .auth(user.username, user.password)
    expect(res.statusCode).toEqual(403)
  })
})

describe('Delete a dog ', () => {
  it('Return the status 204', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/dogs/${id}`)
      .auth(worker.username, worker.password)
    expect(res.statusCode).toEqual(204)
  })
})

describe('Delete a dog which is not found', () => {
  it('Return the status 404 not found', async () => {
    const res = await request(app.callback())
      .delete(`/api/v1/dogs/${id}`)
      .auth(worker.username, worker.password)
    expect(res.statusCode).toEqual(404)
  })
})
