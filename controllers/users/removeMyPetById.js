const { ctrlWrapper } = require('../../utils')
const {MyPet} = require('../../models')

const removeMyPetById = async (req, res, next) => {
    const { myPetId } = req.params;
    const result = await MyPet.findByIdAndDelete(myPetId)
    if (!result) {
    throw HttpError(404, "Not found")
    }
    res.status(200).json({"message": "contact deleted"})
}

module.exports = {removeMyPetById: ctrlWrapper(removeMyPetById)}