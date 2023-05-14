const { HttpError } = require("../../helpers");
const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getAllOwnNotices = async (req, res) => {
  const { _id: owner } = req.user;
  // console.log(req.user);
  const result = await Notices.find({ owner }, "", {}).populate(
    "owner",
    "name email _id, phone"
  );
  res.json(result);
};

module.exports = { getAllOwnNotices: ctrlWrapper(getAllOwnNotices) };
