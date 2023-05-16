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
    birthday: {
        type: String,
        required: [true, 'Set birthday of your pet'],
        match: dateRegexp,
    },
    breed: {
        type: String,
        required: [true, 'Set breed of your pet'], 
        minLength: 2,
        maxLength: 16,
    },
    imageURL: {
        type: String,
        required: [true, 'Set image of your pet'],
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
    birthday: Joi.string().required().pattern(dateRegexp).messages({
        'string.base': `"birthday" should be a type of 'number'`,
        'number.empty': `"birthday" cannot be an empty field`,
        'any.required': `"birthday" is a required field`
    }),
    breed: Joi.string().required().min(2).max(16).alphanum().messages({
        'string.base': `"breed" should be a type of 'text'`,
        'string.empty': `"breed" cannot be an empty field`,
        'any.required': `"breed" is a required field`
    }),
    imageURL: Joi.string().required().optional(),
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