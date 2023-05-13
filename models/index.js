const { User, userSchemas } = require("./userSchema");
const { MyPet, schemas } = require("./myPetSchema");

const { Notices, schemasNotices } = require("./noticesSchema");

module.exports = {
  User,
  userSchemas,
  MyPet,
  schemas,
  Notices,
  schemasNotices,
};
