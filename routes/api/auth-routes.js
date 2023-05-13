const express = require("express");
const { validateBody, ctrlWrapper } = require("../../utils");
const { authenticate, upload } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { schemas } = require("../../models/userSchema");
const router = express.Router();

//signup

router.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrl.register)
);

//signin
router.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrl.login)
);
router.post(
  "/refresh",
  validateBody(schemas.refreshSchema),
  ctrlWrapper(ctrl.refresh)
);
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

module.exports = router;
