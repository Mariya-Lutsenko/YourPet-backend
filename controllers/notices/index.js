const { addNoticesToCategory } = require("./addNoticesToCategory");
const { getNoticesById } = require("./getNoticesById");
const { getNotices } = require("./getNotices");
const { getAllOwnNotices } = require("./getAllOwnNotices");
const { deleteOwnNoticeById } = require("./deleteOwnNoticeById");
const { addNoticeToFavorite } = require("./addNoticeToFavorite");
const { removeNoticeFromFavorite } = require("./removeNoticeFromFavorite");
const { getAllFavorite } = require("./getAllFavorite");
module.exports = {
  addNoticesToCategory,
  getNoticesById,
  getNotices,
  getAllOwnNotices,
  deleteOwnNoticeById,
  addNoticeToFavorite,
  removeNoticeFromFavorite,
  getAllFavorite,
};
