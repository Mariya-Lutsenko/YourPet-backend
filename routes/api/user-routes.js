const express = require("express");
const router = express.Router();
const { validateBody } = require("../../utils");
const { schemas, userSchemas } = require("../../models");
const { users: controllers } = require("../../controllers");
const { isValidId, authenticate, upload } = require("../../middlewares");

router.post(
  "/pets",
  authenticate,
  upload.single("imageURL"),
  validateBody(schemas.addMyPetSchema),
  controllers.addMyPet
);

router.delete(
  "/pets/:id",
  authenticate,
  isValidId,
  controllers.removeMyPetById
);

router.get("/", authenticate, controllers.getAllInfo);

router.patch(
  "/",
  authenticate,
  upload.single("imageURL"),
  validateBody(userSchemas.updateUserSchema),
  controllers.updateUser
);

module.exports = router;
