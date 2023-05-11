const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../utils");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is required`,
    "string.empty": `"phone" cannot be empty`,
  }),
  favorite: Joi.boolean(),
});

const updateStatusSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing field favorite`,
    "string.empty": `"favorite" cannot be empty`,
  }),
});

const schemas = {
  addSchema,
  updateStatusSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
  Contact,
  schemas,
};
