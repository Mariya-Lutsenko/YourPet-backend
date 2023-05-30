const { cloudinaryAddImage } = require("../../middlewares");
const { Notices } = require("../../models");
const { ctrlWrapper } = require("../../utils");
const { HttpError } = require("../../helpers");

const createNotice = async (req, res) => {
  const { _id } = req.user;
  const file = await cloudinaryAddImage(req.file.path);
  const result = await Notices.create({
    ...req.body,
    owner: _id,
    file: file.secure_url,
  });
  if (!result) {
    throw HttpError(400, `Bad request`);
  }
  res.status(201).json(result);
};

module.exports = {
  createNotice: ctrlWrapper(createNotice),
};
