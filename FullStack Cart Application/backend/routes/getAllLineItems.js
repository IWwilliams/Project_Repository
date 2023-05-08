const express = require("express");
const clientController = require("../controller/controller");
const router = express.Router();

router.get("/getAllLineItems", clientController.getAllLineItems);

module.exports = router;
