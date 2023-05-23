const { ctrlWrapper } = require('../../utils')
const { MyPet } = require('../../models')
const { cloudinaryAddImage } = require('../../middlewares');

const addMyPet = async (req, res, next) => {
  const { _id: owner } = req.user;
  let imageURL;
  if (req.file) {
      const photo = await cloudinaryAddImage(req.file.path);
      imageURL = photo.secure_url
  } else {
    imageURL = "https://res.cloudinary.com/dzbevpbos/image/upload/v1684493148/default-pets_z1kxoq.jpg";
  }
  const result = await MyPet.create({ ...req.body, imageURL, owner });
  res.status(201).json(result);
};

module.exports = { addMyPet: ctrlWrapper(addMyPet) };
