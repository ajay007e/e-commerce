const router = require("express").Router();

const { getConfig } = require("../../../controllers/v1/config.controller");

router.get("/:key", getConfig);

module.exports = router;
