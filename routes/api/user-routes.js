const express = require("express");
const router = express.Router();
const { validateBody } = require("../../utils");
const { schemas, userSchemas } = require("../../models");
const { users: controllers } = require("../../controllers");
const { isValidIdMyPet, authenticate, upload } = require("../../middlewares");

router.post(
  "/pets",
  authenticate,
  validateBody(schemas.addMyPetSchema),
  controllers.addMyPet
);

router.delete(
  "/pets/:id",
  authenticate,
  isValidIdMyPet,
  controllers.removeMyPetById
);

router.get("/", authenticate, controllers.getAllInfo);

// updating information about users
router.patch(
  "/",
  authenticate,
  upload.single("imageURL"),
  validateBody(userSchemas.updateUserSchema),
  controllers.updateUser
);

module.exports = router;
