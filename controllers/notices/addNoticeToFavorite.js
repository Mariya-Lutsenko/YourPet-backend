const { HttpError } = require("../../helpers");
const { User } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const addNoticeToFavorite = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw HttpError(404, `User with  id "${id}" not found `);
  }
  if (user.favorite.includes(id)) {
    throw HttpError(
      409,
      `Notices with id "${id}" is already been added to your favorite`
    );
  }
  user.favorite.unshift(id);
  await user.save();
  res.status(200).json({
    id: `${id}`,
    message: "Successfully added to favorites",
  });
};

module.exports = { addNoticeToFavorite: ctrlWrapper(addNoticeToFavorite) };
