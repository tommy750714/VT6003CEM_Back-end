module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/user",
  "title": "Users",
  "description": "User of the website",
  "type": "object",
  "properties": {
    "firstname": {
      "description": "First name of the user",
      "type": "string",
      "maxLength": 32
    },
    "lastname": {
      "description": "Last name of the user",
      "type": "string",
      "maxLength": 32
    },
    "username": {
      "description": "Username of the user for login",
      "type": "string",
      "maxLength": 32
    },
    "about": {
      "description": "Description of the user",
      "type": "string"
    },
    "password": {
      "description": "Password of the user",
      "type": "string",
      "maxLength": 32
    },
    "email": {
      "description": "E-mail of the user",
      "type": "email",
      "maxLength": 64
    },
    "avatarurl": {
      "description": "Avatar URL",
      "type": "url",
      "maxLength": 128
    },
    "workerid": {
      "description": "Worker ID of the user",
      "type": "integer",
      "minimum": 0,
      "maximum": 9999
    }
  },
  "required": ["username", "email", "password"]
}
