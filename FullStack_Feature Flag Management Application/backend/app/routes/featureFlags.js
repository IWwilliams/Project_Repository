/**
 * Express Router for handling Feature Flag requests
 */

const express = require("express");
const clientController = require("../clientContoller/clientController");
const router = express.Router();

/**
 * @route GET /featureflags
 * @desc Get the feature flags for a given project
 * @access
 */
router.get("/featureflags", clientController.getFeatureFlags);

module.exports = router;
