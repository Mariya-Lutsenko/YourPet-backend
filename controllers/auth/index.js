const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const refresh = require("./refresh");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  getCurrent,
  refresh,
  logout,
  updateAvatar,
  verify,
  resendVerifyEmail,
};
