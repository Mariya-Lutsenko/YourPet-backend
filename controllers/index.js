const auth = require("./auth");
const users = require('./users')
const {
  addNoticesToCategory,
  getNoticesById,
  getNotices,
} = require("./notices");

module.exports = {
  auth,
  users,
  addNoticesToCategory,
  getNoticesById,
  getNotices,
};
