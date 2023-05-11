const express = require("express");
const { validateBody, ctrlWrapper } = require("../../utils");
const { authenticate, upload } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const { schemas } = require("../../models/userSchema");
const router = express.Router();

//signup

// router.post(
//   "/register",
//   validateBody(schemas.registerSchema),
//   ctrlWrapper(ctrl.register)
// );

// router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verify));

// router.post(
//   "/verify",
//   validateBody(schemas.emailSchema),
//   ctrlWrapper(ctrl.resendVerifyEmail)
// );

//signin
// router.post(
//   "/login",
//   validateBody(schemas.loginSchema),
//   ctrlWrapper(ctrl.login)
// );
// router.post(
//   "/refresh",
//   validateBody(schemas.refreshSchema),
//   ctrlWrapper(ctrl.refresh)
// );
// router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrent));

// router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

// router.patch(
//   "/avatars",
//   authenticate,
//   upload.single("avatar"),
//   ctrlWrapper(ctrl.updateAvatar)
// );

module.exports = router;
