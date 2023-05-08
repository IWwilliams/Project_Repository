/**
 *  Router for changing a feature flag's status.
 */
const bodyParser = require("body-parser");
const express = require("express");
const clientController = require("../clientContoller/clientController");
const router = express.Router();
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: true }));

/**
 * @route POST /changeflag
 * @desc Updates the value of a feature flag with a given key and value.
 * @access
 */
router.post("/changeflag", clientController.changeFlag);

module.exports = router;
