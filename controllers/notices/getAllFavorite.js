const { HttpError } = require("../../helpers");
const { Notices, User } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getAllFavorite = async (req, res) => {
  const user = req.user;
  const { searchValue, page = 1, limit = 10, sex } = req.query;
  const skip = (page - 1) * limit;

  const query = {
    _id: { $in: user.favorite },
  };

  if (searchValue) {
    query.$text = { $search: searchValue };
  }

  if (sex) {
    query.sex = sex;
  }

  const [notices, totalNotices] = await Promise.all([
    Notices.find(query).skip(skip).limit(Number(limit)),
    Notices.countDocuments(query),
  ]);

  const totalPages = totalNotices === 0 ? 1 : Math.ceil(totalNotices / limit);

  res.status(200).json({ notices, totalPages, page });
};

module.exports = { getAllFavorite: ctrlWrapper(getAllFavorite) };
