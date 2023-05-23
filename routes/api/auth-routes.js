const express = require("express");
const { validateBody, ctrlWrapper } = require("../../utils");
const { authenticate } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { userSchemas } = require("../../models");
const router = express.Router();

router.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

router.post(
  "/login",
  validateBody(userSchemas.loginSchema),
  ctrlWrapper(ctrl.login)
);

router.post(
  "/refresh",
  validateBody(userSchemas.refreshSchema),
  ctrlWrapper(ctrl.refresh)
);

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
