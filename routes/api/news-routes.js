const express = require("express");
const { ctrlWrapper } = require("../../utils");
const { news: ctrl } = require("../../controllers");
const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getNews));

module.exports = router;
