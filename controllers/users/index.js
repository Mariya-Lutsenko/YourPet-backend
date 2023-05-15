const { addMyPet } = require("./addMyPet");
const { removeMyPetById } = require("./removeMyPetById");
const { updateUser } = require("./updateUser");
const {getAllInfo} = require('./getAllInfo')

module.exports = {
  addMyPet,
  removeMyPetById,
  updateUser,
  getAllInfo,
};
