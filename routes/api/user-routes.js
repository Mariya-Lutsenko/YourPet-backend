const express = require("express");
const router = express.Router();
const { validateBody } = require("../../utils");
const { schemas, userSchemas } = require("../../models");
const { users: controllers } = require("../../controllers");
const { isValidIdMyPet, authenticate } = require("../../middlewares");

// router.get('/', authenticate, controllers.getAllContacts)

router.post("/user/pets", authenticate, validateBody(schemas.addMyPetSchema),controllers.addMyPet);

router.delete("/:myPetId", authenticate, isValidIdMyPet, controllers.removeMyPetById);

// updating information about users
router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.updateUserSchema),
  controllers.updateUser
);

module.exports = router;
