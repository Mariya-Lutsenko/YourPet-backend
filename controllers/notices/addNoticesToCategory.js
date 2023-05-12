const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const addNoticesToCategory = async (req, res) => {
  // const { _id: owner } = req.user;
  const result = await Notices.create({ ...req.body });

  res.status(201).json(result);
};

module.exports = {
  addNoticesToCategory: ctrlWrapper(addNoticesToCategory),
};
