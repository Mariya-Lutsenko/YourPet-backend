const { required } = require("joi");
const Joi = require("joi");
const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../utils");

const categories = ["sell", "lost-found", "for-free"];
const dateRegexp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
const sexOptions = ["male", "female"];

const nameRegexp = /^(?=.{2,16}$)([A-Za-z])*$/;
const breedRegexp = /^(?=.{2,16}$)([A-Za-z])*$/;
const cityRegexp = /^([A-Za-z]+)*$/;

const noticesSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for notices"],
      minLength: 2,
      maxLength: 80,
    },
    category: {
      type: String,
      enum: categories,
      default: "sell",
      required: [true],
    },
    name: {
      type: String,
      required: [true, "Set title for notices"],
      match: nameRegexp,
      minLength: 2,
      maxLength: 16,
    },
    date: {
      type: String,
      match: dateRegexp,
      required: true,
    },
    breed: {
      type: String,
      required: [true, "Set breed for notices"],
      match: breedRegexp,
      minLength: 2,
      maxLength: 16,
    },

    file: {
      type: String,
      required: [true, "Set file for notices"],
    },
    sex: {
      type: String,
      enum: sexOptions,
      required: [true, "Set sex for notices"],
    },
    location: {
      type: String,
      match: cityRegexp,
      required: [true, "Set location for notices"],
      minLength: 2,
      maxLength: 50,
    },
    price: {
      type: Number,
      min: [0],
    },

    comments: {
      type: String,
      minLength: 8,
      maxLength: 120,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },

  { versionKey: false }
);

noticesSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().min(2).max(80).required().messages({
    "any.required": `missing required "title"`,
    "string.empty": `"title" cannot be empty`,
  }),
  category: Joi.string()
    .valid(...categories)
    .required(),
  name: Joi.string().pattern(nameRegexp).min(2).max(16).required().messages({
    "any.required": `missing required "name"`,
    "string.empty": `"name" cannot be empty`,
  }),
  date: Joi.string().pattern(dateRegexp).required(),
  breed: Joi.string().pattern(breedRegexp).min(2).max(16).required().messages({
    "any.required": `missing required "breed"`,
    "string.empty": `"breed" cannot be empty`,
  }),

  file: Joi.string().messages({
    "any.required": `missing required "photo"`,
    "string.empty": `"file" cannot be empty`,
  }),
  sex: Joi.string()
    .valid(...sexOptions)
    .required(),
  location: Joi.string()
    .pattern(cityRegexp)
    .min(2)
    .max(50)
    .required()
    .messages({
      "any.required": `missing required "location"`,
      "string.empty": `"location" cannot be empty`,
    }),
  price: Joi.number().min(0).when("category", {
    is: "sell",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),

  comments: Joi.string().min(8).max(120),
});

const schemasNotices = {
  addSchema,
};

const Notices = model("notices", noticesSchema);
module.exports = { Notices, schemasNotices };
