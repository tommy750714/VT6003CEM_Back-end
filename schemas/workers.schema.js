module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  id: '/worker',
  title: 'Workers',
  description: 'A worker of the website',
  type: 'object',
  additionalProperties: false,
  properties: {
    firstname: {
      description: 'First name of the worker',
      type: 'string',
      maxLength: 32
    },
    lastname: {
      description: 'Last name of the worker',
      type: 'string',
      maxLength: 32
    },
    username: {
      description: 'Username of the worker for login',
      type: 'string',
      maxLength: 32
    },
    about: {
      description: 'Description of the worker',
      type: 'string'
    },
    password: {
      description: 'Password of the worker',
      type: 'string',
      maxLength: 32
    },
    email: {
      description: 'E-mail of the worker',
      type: 'string',
      format: 'email',
      maxLength: 64
    },
    avatarurl: {
      description: 'Avatar URL',
      format:'string',
      type: 'url',
      maxLength: 128
    },
    workerid: {
      description: 'Worker ID of the worker',
      type: 'integer',
      minimum: 0,
    }
  },
  required: ['username',
             'password',
             'email',
             'workerid'
            ]
}
