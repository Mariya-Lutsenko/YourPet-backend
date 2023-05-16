const { ctrlWrapper } = require('../../utils')
const { MyPet } = require('../../models')
const {cloudinaryAddImage} = require('../../middlewares')

const addMyPet = async (req, res, next) => {
    const { _id: owner } = req.user;
    if (!req.file) {
        const result = await MyPet.create({...req.body, imageURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", owner})
        res.status(201).json(result)
    } else {
        const imageURL = await cloudinaryAddImage(req.file.path);
        const result = await MyPet.create({...req.body, imageURL: imageURL.secure_url, owner})
        res.status(201).json(result)
    }
}

module.exports = {addMyPet: ctrlWrapper(addMyPet)}