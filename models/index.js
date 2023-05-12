const { User } = require("./userSchema");
const { MyPet, schemas } = require("./myPetSchema");

const { Notices, schemasNotices } = require("./noticesSchema");

module.exports = {
  User,
  MyPet,
  schemas,
  Notices,
  schemasNotices,
};
