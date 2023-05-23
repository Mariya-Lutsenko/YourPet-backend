const { ctrlWrapper } = require('../../utils')
const { MyPet } = require('../../models')
const { cloudinaryAddImage } = require('../../middlewares')

const addMyPet = async (req, res, next) => {
    const { _id: owner } = req.user;
    if (!req.file) {
        const result = await MyPet.create({...req.body, imageURL: "https://res.cloudinary.com/dzbevpbos/image/upload/v1684832832/default-pets_z1kxoq_elq6gv.png", owner})
        res.status(201).json(result)
    } else {
        const imageURL = await cloudinaryAddImage(req.file.path);
        const result = await MyPet.create({...req.body, imageURL: imageURL.secure_url, owner})
        res.status(201).json(result)
    }
}

module.exports = {addMyPet: ctrlWrapper(addMyPet)}