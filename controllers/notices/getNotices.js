const { HttpError } = require("../../helpers");
const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getNotices = async (req, res) => {
  const { category, searchValue, page = 1, limit = 10, sex } = req.query;
  const skip = (page - 1) * limit;

  let totalPages = 1;

  if (!category) {
    throw HttpError(
      400,
      "Missing required parameter of category. Must include sell, lost-found or for-free "
    );
  }

  if (searchValue) {
    if (sex) {
      const allSearchNotices = await Notices.find({
        category,
        $text: { $search: searchValue },
        sex,
      });
      const notices = await Notices.find({
        category,
        $text: { $search: searchValue },
        sex,
      })
        .skip(skip)
        .limit(Number(limit));

      totalPages =
        allSearchNotices.length === 0
          ? 1
          : Math.ceil(allSearchNotices.length / limit);
      return res.status(200).json({ notices, totalPages, page });
    }
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
    return res.status(200).json({ notices, totalPages, page });
  }

  if (sex) {
    const allNotices = await Notices.find({ category, sex });
    totalPages =
      allNotices.length === 0 ? 1 : Math.ceil(allNotices.length / limit);
    const notices = await Notices.find({ category, sex })
      .skip(skip)
      .limit(Number(limit));

    return res.status(200).json({ notices, totalPages, page });
  }

  const allNotices = await Notices.find({ category });
  totalPages =
    allNotices.length === 0 ? 1 : Math.ceil(allNotices.length / limit);
  const notices = await Notices.find({ category })
    .skip(skip)
    .limit(Number(limit));

  return res.status(200).json({ notices, totalPages, page });
};

module.exports = { getNotices: ctrlWrapper(getNotices) };
