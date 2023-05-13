const { ctrlWrapper } = require('../../utils')
const {MyPet} = require('../../models')

const addMyPet = async (req, res, next) => {
    const { _id: owner } = req.user;
    const result = await MyPet.create({...req.body, owner})
    res.status(201).json(result)
}

module.exports = {addMyPet: ctrlWrapper(addMyPet)}