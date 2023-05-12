const express = require("express");

const {
  addNoticesToCategory,
  getNoticesById,
  getNotices,
} = require("../../controllers");

// const {isValidId, authenticate}=require("../../middlewares")

const { validateBody } = require("../../utils");

const router = express.Router();

const { schemasNotices } = require("../../models");

// router.post("/", validateBody(schemasNotices.addSchema), addNoticesToCategory);

router.get("/", getNotices);

router.get("/:id", getNoticesById);
module.exports = router;
