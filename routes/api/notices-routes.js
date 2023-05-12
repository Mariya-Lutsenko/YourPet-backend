const express = require("express");

const { notices } = require("../../controllers");

// const {isValidId, authenticate}=require("../../middlewares")

const { validateBody } = require("../../utils");

const router = express.Router();

const { schemasNotices } = require("../../models");

router.post(
  "/",
  validateBody(schemasNotices.addSchema),
  notices.addNoticesToCategory
);

router.get("/", notices.getNotices);

router.get("/:id", notices.getNoticesById);
module.exports = router;
