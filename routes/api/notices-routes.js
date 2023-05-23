const express = require("express");

const { notices } = require("../../controllers");

const { validateBody } = require("../../utils");

const router = express.Router();

const { schemasNotices } = require("../../models");
const { authenticate, upload, isValidId } = require("../../middlewares");

router.post(
  "/",
  authenticate,
  upload.single("file"),
  validateBody(schemasNotices.addSchema),
  notices.addNoticesToCategory
);

router.get("/", notices.getNotices);

router.get("/:id", isValidId, notices.getNoticesById);

router.get("/user/own", authenticate, notices.getAllOwnNotices);

router.delete("/:id", isValidId, authenticate, notices.deleteOwnNoticeById);

router.patch(
  "/favorite/add/:id",
  authenticate,
  isValidId,
  notices.addNoticeToFavorite
);

router.patch(
  "/favorite/remove/:id",
  authenticate,
  isValidId,
  notices.removeNoticeFromFavorite
);

router.get("/favorite/all", authenticate, notices.getAllFavorite);

module.exports = router;
