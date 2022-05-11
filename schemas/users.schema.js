module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/user",
  "title": "Users",
  "description": "An user in the website",
  "type": "object",
  "properties": {
    "firstname": {
      "description": "First name of the user",
      "type": "string"
    },
    "lastname": {
      "description": "Last name of the user",
      "type": "string"
    },
    "username": {
      "description": "Username for user to login",
      "type": "string"
    },
    "about": {
      "description": "User information",
      "type": "string"
    },
    "password": {
      "description": "Password of the user",
      "type": "string"
    },
    "email": {
      "description": "User's e-mail",
      "type": "email"
    },
    "avatarurl": {
      "description": "Avatar URL",
      "type": "url"
    },
    "role": {
      "description": "Role of the user",
      "type": "string"
    }
  },
  "required": ["username", "email", "password"]
}
