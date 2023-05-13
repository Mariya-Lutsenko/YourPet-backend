const { Schema, model } = require('mongoose')
const Joi = require('joi')
const { handleMongooseError } = require('../utils')

const dateRegexp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;

const myPetSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name of your pet'],
        minLength: 2,
      maxLength: 16,
    },
    date: {
        type: String,
        required: true,
        match: dateRegexp,
    },
    breed: {
        type: String,
        required: true, 
        minLength: 2,
      maxLength: 16,
    },
    file: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: false,
        minLength: 8,
      maxLength: 120,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true
})

myPetSchema.post("save", handleMongooseError)

const MyPet = model("pet", myPetSchema);

const addMyPetSchema = Joi.object({
  name: Joi.string().required().min(2).max(16).messages({
      'string.base': `"name" should be a type of 'text'`,
      'string.empty': `"name" cannot be an empty field`,
      'any.required': `"name" is a required field`
    }),
    date: Joi.string().required().pattern(dateRegexp).messages({
      'string.base': `"date" should be a type of 'number'`,
      'number.empty': `"date" cannot be an empty field`,
      'any.required': `"date" is a required field`
  }),
    breed: Joi.string().required().min(2).max(16).alphanum().messages({
      'string.base': `"breed" should be a type of 'text'`,
      'string.empty': `"breed" cannot be an empty field`,
      'any.required': `"breed" is a required field`
  }),
  file: Joi.string().required().messages({
      'string.empty': `"file" cannot be an empty field`,
      'any.required': `"file" is a required field`
  }),
    comments: Joi.string().min(8).max(120).messages({
      'string.base': `"comments" should be a type of 'text'`,
      'any.required': `"comments" is a required field`
  })
 })
 
const schemas = {
    addMyPetSchema,
}

module.exports = {
    MyPet,
    schemas
}