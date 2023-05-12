const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { HttpError, createTokens } = require("../../helpers");

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!user || !passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };
  const { accessToken, refreshToken } = createTokens(payload);

  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

  res.status(200).json({
    accessToken,
    refreshToken,
    user: {
      email: user.email,
      name: user.name,
    },
  });
};
module.exports = login;
