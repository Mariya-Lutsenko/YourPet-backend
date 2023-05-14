const express = require("express");
const router = express.Router();

const { services } = require("../../controllers");

router.get("/", services.getServices);

module.exports = router;
