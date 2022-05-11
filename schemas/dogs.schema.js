module.exports = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "id": "/dog",
  "title": "Dogs",
  "description": "A dog in the website",
  "type": "object",
  "properties": {
          "name":{
            "description":"Name of the dog",
              "type": "string"                    
          },
          "birthday":{
            "description":"birth date",
              "type": "date"
          },
          "breed":{
            "description":"breed of the dog",
              "type": "string"
          },
          "imageURL":{
            "description":"image URL",
              "type": "url"
          },
          "published":{
            "description":"Published",
              "type": "boolean"
          },
          "authorID":{
            "description":"author ID",
              "type": "integer",
              "minimum":0
          },
          "description":{
            "description":"description of the dog",
              "type": "string"
          }
        },
  "required": ["name", "breed"]
}