const { User, userSchemas } = require("../../models");
const { ctrlWrapper } = require("../../utils");
const { cloudinaryAddImage } = require("../../middlewares");

const updateUser = async (req, res) => {
  const { updateUserSchema } = userSchemas;
  const { imageURL, name, email, birthday, phone, city } = req.body;
  const { error } = updateUserSchema.validate(req.body);
 
  if (error) {
    error.status = 400;
    throw error;
  }
  const { _id } = req.user;

  let updatedFields = { ...req.body };
  if (req.file) {
    const imageURL = await cloudinaryAddImage(req.file.path);
    updatedFields.imageURL = imageURL.secure_url;
  }

  const user = await User.findByIdAndUpdate(
    _id,
    updatedFields,
    { new: true }
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
};
module.exports = { updateUser: ctrlWrapper(updateUser) };
