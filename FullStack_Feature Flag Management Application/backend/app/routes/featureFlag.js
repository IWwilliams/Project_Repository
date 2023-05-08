/**
 * Express Router for handling a Feature Flag request
 */
const express = require("express");
const clientController = require("../clientContoller/clientController");
const router = express.Router();

/**
 * @route GET /featureflag
 * @desc Get the feature flag for a given project
 * @access
 */
router.get("/featureflag/:key", clientController.getFeatureFlag);

module.exports = router;
