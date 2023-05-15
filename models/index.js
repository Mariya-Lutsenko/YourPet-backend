const { User, userSchemas } = require("./userSchema");
const { MyPet, schemas } = require("./myPetSchema");
const { Services } = require("./servicesSchema");
const { News } = require("./newsSchema");

const { Notices, schemasNotices } = require("./noticesSchema");

module.exports = {
  User,
  userSchemas,
  MyPet,
  schemas,
  Notices,
  schemasNotices,
  Services,
  News,
};
