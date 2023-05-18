const { HttpError } = require("../../helpers");
const { Notices, User } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getAllFavorite = async (req, res) => {
  const { _id } = req.user;
  const { searchValue, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const user = await User.findOne({ _id });

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  let totalPages = 1;
  if (!searchValue) {
    const allFavoriteNotices = await Notices.find({
      _id: { $in: user.favorite },
    });
    const notices = await Notices.find({ _id: { $in: user.favorite } })
      .skip(skip)
      .limit(Number(limit));

    totalPages =
      allFavoriteNotices.length === 0
        ? 1
        : Math.ceil(allFavoriteNotices.length / limit);
    res.status(200).json({ notices, totalPages, page });
  }

  if (searchValue) {
    const allFavoriteNotices = await Notices.find({
      _id: { $in: user.favorite },
      $text: { $search: searchValue },
    });
    const notices = await Notices.find({
      _id: { $in: user.favorite },
      $text: { $search: searchValue },
    })
      .skip(skip)
      .limit(Number(limit));
    totalPages =
      allFavoriteNotices.length === 0
        ? 1
        : Math.ceil(allFavoriteNotices.length / limit);

    res.status(200).json({ notices, totalPages, page });
  }
};

module.exports = { getAllFavorite: ctrlWrapper(getAllFavorite) };
