const express = require("express");
const clientController = require("../controller/controller");
const router = express.Router();

router.get("/getPostalLineItems/:postal", clientController.getPostalLineItems);

module.exports = router;
