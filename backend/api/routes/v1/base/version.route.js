const router = require("express").Router();

const { getVersion } = require("../../../controllers/v1/version.controller");

router.get("/", getVersion);

module.exports = router;
