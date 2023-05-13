const { User } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const updateUser = async (req, res) => {
  const { _id } = req.user;
};
module.exports = { updateUser: ctrlWrapper(updateUser) };
