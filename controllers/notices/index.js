const { addNoticesToCategory } = require("./addNoticesToCategory");
const { getNoticesById } = require("./getNoticesById");
const { getNotices } = require("./getNotices");
const { getAllOwnNotices } = require("./getAllOwnNotices");
const { deleteOwnNoticesById } = require("./deleteOwnNoticesById");

module.exports = {
  addNoticesToCategory,
  getNoticesById,
  getNotices,
  getAllOwnNotices,
  deleteOwnNoticesById,
};
