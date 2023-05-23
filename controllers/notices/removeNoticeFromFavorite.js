const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const removeNoticeFromFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(404, `User with  id "${id}" not found `);
  }
  if (!user.favorite.includes(id)) {
    throw HttpError(409, `Notices with id "${id}" not found in your favorite`);
  }
  user.favorite.pull(id);
  await user.save();
  res
    .status(200)
    .json({ id: `${id}`, message: "Successfully removed from favorites" });
};

module.exports = {
  removeNoticeFromFavorite: ctrlWrapper(removeNoticeFromFavorite),
};
