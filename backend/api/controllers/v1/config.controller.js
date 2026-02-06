const configHelpers = require("../../../helpers/config.helpers");

module.exports = {
  getConfig: (req, res) => {
    const key = req.params.key;
    configHelpers
      .getConfig(key)
      .then((config) => {
        if (!config) {
          return res.status(404).json({
            status: false,
            message: "Config not found",
          });
        }
        res.json({
          status: true,
          config,
        });
      })
      .catch((error) => {
        console.error("getConfig error:", error);
        res.status(500).json({
          status: false,
          message: "Failed to load config",
        });
      });
  },

  getAllConfigs: (req, res) => {
    configHelpers
      .getAllConfigs()
      .then((configs) => {
        res.json({
          status: true,
          configs,
        });
      })
      .catch((error) => {
        console.error("getAllConfigs error:", error);
        res.status(500).json({
          status: false,
          message: "Failed to load configs",
        });
      });
  },

  updateConfig: (req, res) => {
    const { key, data } = req.body;
    if (!key || !data) {
      return res.status(400).json({
        status: false,
        message: "Key and data are required",
      });
    }
    configHelpers
      .upsertConfig(key, data)
      .then((result) => {
        res.json(result);
      })
      .catch((error) => {
        console.error("updateConfig error:", error);
        res.status(500).json({
          status: false,
          message: "Failed to save config",
        });
      });
  },

  deleteConfig: (req, res) => {
    const key = req.params.key;
    configHelpers
      .deleteConfig(key)
      .then((result) => {
        if (!result.status) {
          return res.status(404).json(result);
        }
        res.json(result);
      })
      .catch((error) => {
        console.error("deleteConfig error:", error);
        res.status(500).json({
          status: false,
          message: "Failed to delete config",
        });
      });
  },
};
