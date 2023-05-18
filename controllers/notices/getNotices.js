const { HttpError } = require("../../helpers");
const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getNotices = async (req, res) => {
  const { category, searchValue, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  let totalPages = 1;
  if (!searchValue) {
    const allNotices = await Notices.find({ category });
    const notices = await Notices.find({ category })
      .skip(skip)
      .limit(Number(limit));
    totalPages =
      allNotices.length === 0 ? 1 : Math.ceil(allNotices.length / limit);
    res.status(200).json({ notices, totalPages, page });
  }

  if (searchValue) {
    const allSearchNotices = await Notices.find({
      category,
      $text: { $search: searchValue },
    });
    const notices = await Notices.find({
      category,
      $text: { $search: searchValue },
    })
      .skip(skip)
      .limit(Number(limit));

    totalPages =
      allSearchNotices.length === 0
        ? 1
        : Math.ceil(allSearchNotices.length / limit);
    res.status(200).json({ notices, totalPages, page });
  }
};

module.exports = { getNotices: ctrlWrapper(getNotices) };
