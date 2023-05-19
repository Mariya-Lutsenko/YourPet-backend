const { HttpError } = require("../../helpers");
const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getAllOwnNotices = async (req, res) => {
  const { _id: owner } = req.user;
  const { searchValue, page = 1, limit = 10, sex } = req.query;
  const skip = (page - 1) * limit;

  let totalPages = 1;
  if (searchValue) {
    if (sex) {
      const allSearchNotices = await Notices.find({
        owner,
        $text: { $search: searchValue },
        sex,
      });

      const notices = await Notices.find({
        owner,
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
      owner,
      $text: { $search: searchValue },
    });
    const notices = await Notices.find({
      owner,
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
    const allNotices = await Notices.find({ owner, sex });
    const notices = await Notices.find({ owner, sex })
      .skip(skip)
      .limit(Number(limit));
    totalPages =
      allNotices.length === 0 ? 1 : Math.ceil(allNotices.length / limit);
    return res.status(200).json({ notices, totalPages, page });
  }

  const allNotices = await Notices.find({ owner });
  const notices = await Notices.find({ owner }).skip(skip).limit(Number(limit));
  totalPages =
    allNotices.length === 0 ? 1 : Math.ceil(allNotices.length / limit);
  res.status(200).json({ notices, totalPages, page });
};

module.exports = { getAllOwnNotices: ctrlWrapper(getAllOwnNotices) };
