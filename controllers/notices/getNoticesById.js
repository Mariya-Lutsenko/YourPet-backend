const { HttpError } = require("../../helpers");
const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getNoticesById = async (req, res) => {
  const { id } = req.params;
  const result = await Notices.findById(id).populate([
    { path: "owner", model: "user", select: "name phone email" },
  ]);
  if (!result) {
    throw HttpError(404, `Notices with ${id} not found`);
  }
  res.json(result);
};

module.exports = { getNoticesById: ctrlWrapper(getNoticesById) };
