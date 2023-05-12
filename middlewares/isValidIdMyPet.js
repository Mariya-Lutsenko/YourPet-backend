const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidIdMyPet = (req, res, next) => {
  const { myPetId } = req.params;
  if (!isValidObjectId(myPetId)) {
    next(HttpError(404, `${myPetId} invalid format`));
  }
  next();
};

module.exports = isValidIdMyPet;
