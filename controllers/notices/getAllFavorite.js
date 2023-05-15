const { HttpError } = require("../../helpers");
const { Notices, User } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getAllFavorite = async (req, res) => {
  const { _id } = req.user;
  const { searchValue, page, limit } = req.query;
  const skip = (page - 1) * limit;

  const user = await User.findOne({ _id });

  if (!user) {
    throw new HttpError(404, "User not found");
  }
  const favoriteNotices = await Notices.find({ _id: { $in: user.favorite } })
    .skip(skip)
    .limit(Number(limit));

  if (!favoriteNotices) {
    throw HttpError(404, `Favorite  notices not found `);
  }

  if (searchValue) {
    const filteredNotices = favoriteNotices.filter((notice) =>
      notice.title.includes(`${searchValue}`)
    );

    if (filteredNotices.length < 1) {
      throw HttpError(404, `Notices with "${searchValue}" title not found`);
    }
    res.json(filteredNotices);
  }

  if (searchValue === "" || !searchValue) {
    res.json(favoriteNotices);
  }
};

module.exports = { getAllFavorite: ctrlWrapper(getAllFavorite) };
