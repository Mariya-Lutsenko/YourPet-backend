const bcrypt = require("bcryptjs");
const { User, userSchemas } = require("../../models/userSchema");
const { HttpError } = require("../../helpers");

const register = async (req, res) => {
  const { registerSchema } = userSchemas;
  const { error } = registerSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const result = await User.create({
    ...req.body,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      name: result.name,
      email: result.email,
    },
  });
};

module.exports = register;
