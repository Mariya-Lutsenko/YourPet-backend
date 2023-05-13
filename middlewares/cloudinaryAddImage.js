const { cloudinary } = require("../utils");
const fs = require("fs/promises");
const Jimp = require("jimp");

const cloudinaryAddImage = async (path) => {
  try {
    const resizeImg = await Jimp.read(path);
    resizeImg.cover(450, 450);
    await resizeImg.writeAsync(path);
    const result = await cloudinary.uploader.upload(path);
    fs.unlink(path);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = cloudinaryAddImage;
