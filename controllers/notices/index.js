const { addNoticesToCategory } = require("./addNoticesToCategory");
const { getNoticesById } = require("./getNoticesById");
const { getNotices } = require("./getNotices");
const { getAllOwnNotices } = require("./getAllOwnNotices");
const { deleteOwnNoticesById } = require("./deleteOwnNoticesById");
const { addNoticeToFavorite } = require("./addNoticeToFavorite");
const { removeNoticeFromFavorite } = require("./removeNoticeFromFavorite");
const { getAllFavorite } = require("./getAllFavorite");
module.exports = {
  addNoticesToCategory,
  getNoticesById,
  getNotices,
  getAllOwnNotices,
  deleteOwnNoticesById,
  addNoticeToFavorite,
  removeNoticeFromFavorite,
  getAllFavorite,
};
