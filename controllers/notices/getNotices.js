const { HttpError } = require("../../helpers");
const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getNotices = async (req, res) => {
  const { category, searchValue, page = 1, limit = 10, sex } = req.query;
  const skip = (page - 1) * limit;

  if (!category) {
    throw new HttpError(
      400,
      "Missing required parameter of category. Must include sell, lost-found, or for-free"
    );
  }

  let query = { category };

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

module.exports = { getNotices: ctrlWrapper(getNotices) };
