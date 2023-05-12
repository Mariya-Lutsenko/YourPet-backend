const jwt = require("jsonwebtoken");

const { REFRESH_JWT_SECRET, ACCESS_JWT_SECRET } = process.env;

const createTokens = (payload) => {
  const accessToken = jwt.sign(payload, ACCESS_JWT_SECRET, {
    expiresIn: "23h",
  });
  const refreshToken = jwt.sign(payload, REFRESH_JWT_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

module.exports = createTokens;
