const { Schema, model } = require('mongoose');
const Joi = require('joi');
const {handleMongooseError} = require('../utils')

const myPetSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name of your pet'],
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true, 
    },
    photo: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: false
    },
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'user',
    //     required: true,
    // },
}, {
    versionKey: false,
    timestamps: true
})

myPetSchema.post("save", handleMongooseError)

const MyPet = model("pet", myPetSchema);

const addMyPetSchema = Joi.object({
  name: Joi.string().required().messages({
      'string.base': `"name" should be a type of 'text'`,
      'string.empty': `"name" cannot be an empty field`,
      'any.required': `"name" is a required field`
    }),
    dateOfBirth: Joi.string().required().messages({
      'string.base': `"dateOfBirth" should be a type of 'number'`,
      'number.empty': `"dateOfBirth" cannot be an empty field`,
      'any.required': `"dateOfBirth" is a required field`
  }),
    breed: Joi.string().required().alphanum().messages({
      'string.base': `"breed" should be a type of 'text'`,
      'string.empty': `"breed" cannot be an empty field`,
      'any.required': `"breed" is a required field`
  }),
  photo: Joi.string().required().messages({
      'string.empty': `"photo" cannot be an empty field`,
      'any.required': `"photo" is a required field`
  }),
    comments: Joi.string().min(0).max(120).messages({
      'string.base': `"comments" should be a type of 'text'`,
      'string.empty': `"comments" cannot be an empty field`,
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