const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { REFRESH_JWT_SECRET, ACCESS_JWT_SECRET } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: refToken } = req.body;
  try {
    const { id } = jwt.verify(refToken, REFRESH_JWT_SECRET);
    const isExist = await User.findOne({ refreshToken: refToken });
    if (!isExist) {
      throw HttpError(403, "Token invalid");
    }

    const payload = {
      id,
    };
    const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, {
      expiresIn: "23h",
    });
    const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw HttpError(403, error.message);
  }
};
module.exports = refresh;
