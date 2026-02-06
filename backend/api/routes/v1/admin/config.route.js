const router = require("express").Router();

const {
  getAllConfigs,
  updateConfig,
  deleteConfig,
} = require("../../../controllers/v1/config.controller");

router.get("/", getAllConfigs);
router.put("/", updateConfig);
router.delete("/:key", deleteConfig);

module.exports = router;
