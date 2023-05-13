const express = require("express");
const router = express.Router();
const { validateBody, ctrlWrapper } = require("../../utils");
const { schemas } = require("../../models");
const { userSchemas } = require("../../models/userSchema");
const { users: controllers } = require("../../controllers");
const { isValidIdMyPet, authenticate } = require("../../middlewares");

// router.get('/', authenticate, controllers.getAllContacts)

// authenticate
router.post(
  "/user/pets",
  validateBody(schemas.addMyPetSchema),
  controllers.addMyPet
);

// authenticate
router.delete("/:myPetId", isValidIdMyPet, controllers.removeMyPetById);

// updating information about users
router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.updateUserSchema),
  controllers.updateUser
);
module.exports = router;
