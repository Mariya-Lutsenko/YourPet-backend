const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const { ctrlWrapper } = require("../../utils");
const { cloudinaryAddImage } = require("../../middlewares");

const updateUser = async (req, res) => {
  // const { updateUserSchema } = userSchemas;
  // const { imageURL, name, email, birthday, phone, city } = req.body;
  // const { error } = updateUserSchema.validate(req.body);
  // if (error) {
  //   error.status = 400;
  //   throw error;
  // }

  const { _id } = req.user;
  if (!req.file) {
    const user = await User.findByIdAndUpdate(
      _id,
      { ...req.body },
      {
        new: true,
      }
    ).select("-accessToken -refreshToken -createdAt -password -updatedAt");
    res.status(200).json({
      user: {
        imageURL: user.imageURL,
        userInfo: {
          name: user.name,
          email: user.email,
          city: user.city,
          phone: user.phone,
          birthday: user.birthday,
        },
      },
    });
  } else {
    const imageURL = await cloudinaryAddImage(req.file.path);
    const user = await User.findByIdAndUpdate(
      _id,
      { ...req.body, imageURL: imageURL.secure_url },
      {
        new: true,
      }
    ).select("-accessToken -refreshToken -createdAt -password -updatedAt");
    res.status(200).json({
      user: {
        imageURL: user.imageURL,
        userInfo: {
          name: user.name,
          email: user.email,
          city: user.city,
          phone: user.phone,
          birthday: user.birthday,
        },
      },
    });
  }
};
module.exports = { updateUser: ctrlWrapper(updateUser) };
