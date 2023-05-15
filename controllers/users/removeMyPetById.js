const { ctrlWrapper } = require('../../utils')
const {MyPet} = require('../../models')

const removeMyPetById = async (req, res, next) => {
    const { id } = req.params;
    console.log(id)
    const result = await MyPet.findByIdAndDelete(id)
    if (!result) {
    throw HttpError(404, "Not found")
    }
    res.status(200).json({message: "pet has been deleted", id})
}

module.exports = {removeMyPetById: ctrlWrapper(removeMyPetById)}