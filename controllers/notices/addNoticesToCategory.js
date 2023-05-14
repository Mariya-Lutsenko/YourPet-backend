const { cloudinaryAddImage } = require("../../middlewares");
const { Notices } = require("../../models");
const { ctrlWrapper, cloudinary } = require("../../utils");

const addNoticesToCategory = async (req, res) => {
  const { _id } = req.user;

  const file = await cloudinaryAddImage(req.file.path);

  const result = await Notices.create({
    ...req.body,
    owner: _id,
    file: file.secure_url,
  });
  res.status(201).json(result);
};

module.exports = {
  addNoticesToCategory: ctrlWrapper(addNoticesToCategory),
};
