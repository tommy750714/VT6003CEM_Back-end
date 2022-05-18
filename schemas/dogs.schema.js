module.exports = {
  $schema: 'http://json-schema.org/draft-04/schema#',
  id: '/dog',
  title: 'Dogs',
  description: 'A dog in website',
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
      description: 'Name of the dog',
      type: 'string',
      maxLength: 32
    },
    description: {
      description: 'description of the dog',
      type: 'string'
    },
    breed: {
      description: 'breed of the dog',
      type: 'string',
      maxLength: 32
    },
    birthday: {
      description: 'birthday of the dog',
      type: 'string',
      format: 'date'
    },
    imageURL: {
      description: 'image URL',
      format:'string',
      type: 'url',
      maxLength: 128
    },
    published: {
      description: 'Published',
      type: 'boolean'
    },
    authorID: {
      description: 'author ID',
      type: 'integer',
      minimum: 0,
      maximum: 99999
    }
  },
  required: [
    'name',
    'breed'
  ]
}