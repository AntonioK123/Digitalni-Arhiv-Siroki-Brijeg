const express = require("express");
const { dbController } = require("../controllers/controllers");
const router = express.Router();

router.route("/").get(dbController);

module.exports = router;
