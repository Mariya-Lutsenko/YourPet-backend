const express = require("express");
const router = express.Router();
const { validateBody } = require("../../utils");
const { schemas, userSchemas } = require("../../models");
const { users: controllers } = require("../../controllers");
const {
  isValidIdMyPet,
  authenticate,
  upload,
  cloudinaryAddImage,
} = require("../../middlewares");

router.post(
  "/user/pets",
  authenticate,
  validateBody(schemas.addMyPetSchema),
  controllers.addMyPet
);

router.delete(
  "/user/pets/:id",
  authenticate,
  isValidIdMyPet,
  controllers.removeMyPetById
);

router.get('/current/user/info', authenticate, controllers.getAllInfo)

// updating information about users
router.patch(
  "/",
  authenticate,
  upload.single("imageURL"),
  validateBody(userSchemas.updateUserSchema),
  controllers.updateUser
);

module.exports = router;
