const express = require("express");

const { notices } = require("../../controllers");

const { validateBody } = require("../../utils");

const router = express.Router();

const { schemasNotices } = require("../../models");
const { authenticate, upload, isValidIdMyPet } = require("../../middlewares");

router.post(
  "/",
  authenticate,
  upload.single("file"),
  validateBody(schemasNotices.addSchema),
  notices.addNoticesToCategory
);

router.get("/", notices.getNotices);

router.get("/:id", isValidIdMyPet, notices.getNoticesById);

router.get("/user/own", authenticate, notices.getAllOwnNotices);

router.delete(
  "/:id",
  isValidIdMyPet,
  authenticate,
  notices.deleteOwnNoticesById
);

router.patch(
  "/favorite/add/:id",
  authenticate,
  isValidIdMyPet,
  notices.addNoticeToFavorite
);
router.patch(
  "/favorite/remove/:id",
  authenticate,
  isValidIdMyPet,
  notices.removeNoticeFromFavorite
);
router.get("/favorite/all", authenticate, notices.getAllFavorite);

module.exports = router;
