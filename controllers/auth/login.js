const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { REFRESH_JWT_SECRET, ACCESS_JWT_SECRET } = process.env;

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
  const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, {
    expiresIn: "23h",
  });
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });
  await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });
  res.status(200).json({
    accessToken,
    refreshToken,
    user: {
      email: user.email,
      name: user.name,
      imageURL: user.imageURL,
      city: user.city,
      phone: user.phone,
      birthday: user.birthday,
      favorite: user.favorite,
    },
  });
};

module.exports = login;
