const AccessControl = require('role-acl')

const ac = new AccessControl()

ac.grant('user').execute('read').on('dogs')

ac.grant('admin').execute('*').on('dogs')

ac.grant('worker').execute('create').on('dogs', ['name', 'description', 'birthday', 'imageurl', 'published', 'breed'])
ac.grant('worker').execute('update').on('dogs', ['name', 'description', 'birthday', 'imageurl', 'published', 'breed'])
ac.grant('worker').execute('delete').on('dog')

// Create the dog
exports.createDog = (requester) => ac.can(requester.role).execute('create').sync().on('dogs')

// Update the dog
exports.updateDog = (requester) => ac.can(requester.role).execute('update').sync().on('dogs')

// Delete the dog
exports.deleteDog = (requester) => ac.can(requester.role).execute('delete')
.sync().on('dog')