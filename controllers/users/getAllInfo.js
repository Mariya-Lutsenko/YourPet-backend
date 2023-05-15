const { ctrlWrapper } = require('../../utils')
const { MyPet, User } = require('../../models')

const getAllInfo = async (req, res, next) => {
    const { _id: owner } = req.user;
    const user = await User.findById(owner)
    const result = await MyPet.find({ owner })
    res.json({pets: result, user});
}

module.exports = {getAllInfo: ctrlWrapper(getAllInfo)}