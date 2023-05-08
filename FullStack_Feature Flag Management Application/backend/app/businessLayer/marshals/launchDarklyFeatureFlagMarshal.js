/**
 * This module exports functions to marshal feature flag data from LaunchDarkly.
 *
 * @module launchDarklyFeatureFlagMarshal
 */

const FeatureFlag = require("../../../../shared/model/featureFlag");

/**
 * Marshals feature flag data into an array from a LaunchDarkly JSON file.
 *
 * @param {string} json_file - The LaunchDarkly JSON file.
 * @returns {Array} An array of marshalled feature flags (or single flag).
 */
launchDarklyFlagMarshaller = (json_file) => {
  //parsifying the launch darkly json_file into an object
  const launch_darkly_json = JSON.parse(json_file);

  //creating feature flag array
  let feature_flags = [];

  if (Array.isArray(launch_darkly_json.items)) {
    // If request is multiple feature flags
    launch_darkly_json.items.forEach((item) => {
      feature_flags.push(
        new FeatureFlag(
          item.key,
          item.name,
          item.environments.production.on,
          new Date(item.environments.production.lastModified),
          item.description
        )
      );
    });
  } else {
    // If request is a single feature flag
    const feature_flag = new FeatureFlag(
      launch_darkly_json.key,
      launch_darkly_json.name,
      launch_darkly_json.environments.production.on,
      new Date(launch_darkly_json.environments.production.lastModified),
      launch_darkly_json.description
    );

    feature_flags.push(feature_flag);
  }

  return feature_flags;
};

module.exports = {
  launchDarklyFlagMarshaller,
};
