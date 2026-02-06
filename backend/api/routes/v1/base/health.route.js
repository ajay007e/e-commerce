const router = require("express").Router();

const { getHealth } = require("../../../controllers/v1/health.controller");

router.get("/", getHealth);

module.exports = router;
