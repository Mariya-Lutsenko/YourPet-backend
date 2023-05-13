const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { handleMongooseError } = require("../utils");

const nameRegexp = /^(?=.{2,16}$)([A-Za-z])*$/;
const emailRegexp =
  /^(?=.{10,63}$)(([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/;
const passRegexp = /^[a-z0-9A-Z_-]+$/;
const phoneRegexp = /^\+38(0\d{9})$/;
const dateRegExp =
  /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
const cityRegexp = /^([A-Za-z]+)*$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegexp,
      required: [true, "Email is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      default: "",
    },
    birthday: {
      type: String,
      match: dateRegExp,
      default: "",
    },
    city: {
      type: String,
      default: "",
      match: cityRegexp,
    },
    avatarURL: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    favorite: {
      type: Array,
      default: [],
    },
    accessToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(1).pattern(nameRegexp).required(),
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
  password: Joi.string().pattern(passRegexp).min(6).max(32).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).min(10).max(63).required(),
  password: Joi.string().pattern(passRegexp).min(6).max(32).required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  refreshSchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
