/**
 * Class for representing a feature flag.
 *
 * @class FeatureFlag
 * @property {string} key - Key of the feature flag
 * @property {string} name - Name of the feature flag
 * @property {boolean} value - Value of the feature flag
 * @property {Date} lastUpdatedDate - Date when the feature flag was last updated
 * @property {string} description - Description of the feature flag
 */
module.exports = class FeatureFlag {
  /**
   * Constructor for creating a new instance of FeatureFlag.
   *
   * @constructor
   * @param {string} key - Key of the feature flag
   * @param {string} name - Name of the feature flag
   * @param {boolean} value - Value of the feature flag
   * @param {Date} lastUpdatedDate - Date when the feature flag was last updated
   * @property {string} description - Description of the feature flag
   */
  constructor(key, name, value, lastUpdatedDate, description) {
    this.key = key;
    this.name = name;
    this.value = value;
    this.lastUpdatedDate = lastUpdatedDate;
    this.description = description;
  }
};
