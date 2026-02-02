const fs = require("fs");
const helpers = require("../../helpers/config.helpers");

exports.updateHeroSectionConfig = async (req, res) => {
  try {
    const config = JSON.parse(req.body.config);
    console.log(config);
    res.json({
      success: true,
      config,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getHeroSectionConfig = async (req, res) => {
  try {
    const config = await helpers.getConfig("hero");
    console.log(config);
    res.json({
      success: true,
      config,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
