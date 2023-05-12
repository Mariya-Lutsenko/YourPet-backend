const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { nanoid } = require("nanoid");
const { BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();

  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });

  res.status(201).json({
    email: result.email,
    password: result.password,
  });
};

module.exports = register;
